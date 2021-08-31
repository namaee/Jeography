import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; 
import { State } from '../app.component';
import { ColorService } from '../color.service';
import { prefectures, prefecturesSvg, regionSvg, citiesSvg} from '../data';
import { GameState, Mode } from '../quiz/quiz';
import { QuizService } from '../quiz/quiz.service';
import { SettingsService } from '../quiz/settings/settings.service';
import { MapService } from './map.service';
import { MapDragDirective } from './mapDrag.directive';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MapDragDirective)
  public mapDrag: MapDragDirective;
  @Input() state: State = null
  public prefectures = prefectures;
  public prefecturesSvg = prefecturesSvg;
  public regionsSvg = regionSvg;
  public citiesSvg = citiesSvg;
  private subscriptions: Subscription = new Subscription();
  public activeCit: typeof citiesSvg[0] = null;
  public activeReg: string = '';
  public zoomLevel: number = 1;

  private mouseWheel: Subject<WheelEvent> = new Subject<WheelEvent>();

  @HostListener('document:wheel', ['$event'])
  public onMouseWheel(event: WheelEvent): void {
    this.mouseWheel.next(event);
  }
  
  constructor(private elementRef: ElementRef, public ms: MapService, public qs: QuizService, public cs: ColorService) {
  }

  debugger(event: MouseEvent) {
    console.log('cx: "' + Math.round((((event.offsetX - 51) / 1.456) ) * 10) / 10 + '", cy: "' + Math.round(((event.offsetY - 14) / 1.456) * 10) / 10 + '"');

  }
  ngOnInit(): void {
    const template = document.getElementById('info-info');
    tippy('.info-info', {
      content: template,
      delay: 0,
      duration: [200, 0],
      placement: 'bottom-end',
    })
  }

  public onwheel(event: WheelEvent) {
    this.mapDrag.checkMousePosition(event);
    if (this.mapDrag.mouseOnCanvas) { //FIX MOUSEONCANVAS
      event.preventDefault();
      if (event.deltaY < 0) {
        this.onZoomIn();
      } else {
        this.onZoomOut();
      }
    }
    
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#2b2b2b';
  }

  //map interaction to legend
  public onClick(event: MouseEvent) {
    let ele = event.target as SVGPathElement;
    if (ele.hasAttribute('title')) {
      if (this.state == State.QUIZ && this.qs.state == GameState.OCC && !this.mapDrag.dirty) {
        this.qs.nextQuestion(ele.getAttribute('title'))
      } else if (this.state == State.VIEW && !this.mapDrag.dirty) {
        this.setActive(ele)
      }
    }
  }

  public setActive(ele: SVGPathElement) {
    if (this.ms.mode.value == Mode.PREF) {
      this.ms.setActive(ele.getAttribute('title'));
    } 
    else if (this.ms.mode.value == Mode.CIT) {
      this.ms.setActive(ele.getAttribute('title'));
    }
  }

  public onReset() {
    this.zoomLevel = 1;
    this.mapDrag.resetView();
  }

  public onZoomIn() {
    if (this.zoomLevel >= 17) {
      return;
    }
    this.zoomLevel = this.zoomLevel * 1.5;
  }

  public onZoomOut() {
    if (this.zoomLevel <= 1) {
      return;
    }
    this.zoomLevel = this.zoomLevel / 1.5;
  }

  public get mapStyle(): { [key: string]: string } {
    const style: { [key: string]: string } = {};
    style['transform'] = 'scale(' + this.zoomLevel + ')';
    if (this.mapDrag != undefined) {
        style['transform-origin'] = (50 - (this.mapDrag.currentX / 8)) + "% " + (50 - (this.mapDrag.currentY / 8)) + "%";
    }
    style['fill'] = this.cs.mapTheme[this.cs.currentThemeIndex].fill
    style['stroke'] = this.cs.mapTheme[this.cs.currentThemeIndex].stroke
    if (this.ms.mode.value == Mode.PREF || this.ms.mode.value == Mode.CIT) {
      style['stroke-width'] =  0.65 - 0.7 * ((Math.log(this.zoomLevel) / Math.log(1.5)) / 12) + 'px';
    } else if (this.ms.mode.value == Mode.REG) {
      style['stroke-width'] =  1 - ((Math.log(this.zoomLevel) / Math.log(1.5)) / 12) + 'px';
    }
    if (this.mapDrag?.dirty) {
      style['cursor'] = 'grabbing'
    }
    return style;
  }

  public get mapPaths(): { [key: string]: string } {
    const style: { [key: string]: string } = {};
    if (this.mapDrag?.dirty) {
      style['cursor'] = 'grabbing'
    }
    return style;
  }

  public get cityCircles(): { [key: string]: string } {
    const style: { [key: string]: string } = {};
    style['stroke-width'] =  0.65 - 0.7 * ((Math.log(this.zoomLevel) / Math.log(1.5)) / 12) + 'px';
    return style;
  }
  
  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  
  public get stateEnum(): typeof State {
    return State; 
  }
  public get gameStateEnum(): typeof GameState {
    return GameState; 
  }
  public get modeEnum(): typeof Mode {
    return Mode; 
  }
}

