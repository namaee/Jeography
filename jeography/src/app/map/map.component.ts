import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { State } from '../app.component';
import { prefectures, prefecturesSvg } from '../data';
import { GameState } from '../quiz/quiz';
import { QuizService } from '../quiz/quiz.service';
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
  private subscriptions: Subscription = new Subscription();
  public activePrefecture: string = '';
  public zoomLevel: number = 1;

  private mouseWheel: Subject<WheelEvent> = new Subject<WheelEvent>();

  @HostListener('document:wheel', ['$event'])
  public onMouseWheel(event: WheelEvent): void {
    this.mouseWheel.next(event);
  }
  
  constructor(private elementRef: ElementRef, public mapService: MapService, public qs: QuizService) {
  }

  ngOnInit(): void {
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
    let path = event.target as SVGPathElement;
    if (path.hasAttribute('title')) {
      if (this.state == State.QUIZ && this.qs.state == GameState.OCC && !this.mapDrag.dirty) {
        this.qs.nextQuestion(path.getAttribute('title'))
        console.log(this.qs.questionIndex);
        
      } else if (this.state == State.VIEW && !this.mapDrag.dirty) {
        if (this.activePrefecture == path.getAttribute('title')) {
          this.activePrefecture = ''
          this.mapService.setActivePrefecture('');
          return;
        }
        this.activePrefecture = path.getAttribute('title');
        this.mapService.setActivePrefecture(this.activePrefecture);
      }
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
    style['stroke'] = 'rgb(242, 242, 242)';
    style['stroke-width'] =  0.65 / this.zoomLevel + 'px';
    return style;
  }

  public get mapPaths(): { [key: string]: string } {
    const style: { [key: string]: string } = {};
    if (this.mapDrag?.dirty) {
      style['cursor'] =  'default'
    }
    return style;
  }
  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  
  public get stateEnum(): typeof State {
    return State; 
  }
}

