import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, QueryList, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { State } from '../app.component';
import { prefectures } from '../data';
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
  private subscriptions: Subscription = new Subscription();
  public activePrefecture: string = '';
  public zoomLevel: number = 1;

  private mouseWheel: Subject<WheelEvent> = new Subject<WheelEvent>();

  @HostListener('document:wheel', ['$event'])
  public onMouseWheel(event: WheelEvent): void {
    this.mouseWheel.next(event);
  }
  
  constructor(private elementRef: ElementRef, public mapService: MapService, public qs: QuizService) {
    this.subscriptions.add(
      this.mapService.hover.subscribe((prefecture: string) => {
        if (prefecture) {
          // this.setHoverColor(prefecture);
          this.activePrefecture = prefecture;
        } else {
          // this.resetHoverColor();
          this.activePrefecture = '';
        }
      })
    )  
  }

  ngOnInit(): void {
  }

  public onwheell(event: WheelEvent) {
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


  // //legend interaction to map
  // public setHoverColor(name: string) {
  //   if (this.prefectures && name) {
  //     this.prefectures.find((prefecture) => {
        
  //     })
  //   }
  // }

  // public resetHoverColor() {
  //   this.prefectures.forEach((prefecture) => {
  //     // prefecture.hover = false;
  //   })
  // }

  //map interaction to legend
  public onClick(event: MouseEvent) {
    let path = event.target as SVGPathElement;
    if (path.hasAttribute('title')) {
      // console.log(path.getAttribute('title'));
      if (this.qs.state && !this.mapDrag.dirty) {
        this.qs.nextQuestion()
        console.log('quiz log');
        
      }
      //check using service if state is quiz, then ->
    } else {
      // console.log('NO PREFECTURE');
    }
  }

  //map interaction to legend
  public onHover(event: MouseEvent) {
    let path = event.target as SVGPathElement;
    if (path.hasAttribute('title')) {
      this.mapService.prefectureHover(path.getAttribute('title'));
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
  public onLeave() {
    this.mapService.prefectureLeave();
  }

  public get mapStyle(): { [key: string]: string } {
    const style: { [key: string]: string } = {};
    style['transform'] = 'scale(' + this.zoomLevel + ')';
    if (this.mapDrag != undefined) {
        style['transform-origin'] = (50 - (this.mapDrag.currentX / 8)) + "% " + (50 - (this.mapDrag.currentY / 9)) + "%";
    }
    style['stroke'] = 'rgb(242, 242, 242)';
    style['stroke-width'] =  0.65 / this.zoomLevel + 'px';
    return style;
  }

  public mapPathStyle(title: string): { [key: string]: string } {
    const style: { [key: string]: string } = {};
    style['fill'] = this.activePrefecture == title ? 'rgb(255, 198, 99)' : 'rgb(92, 171, 255)'
    if (this.qs.state) {
      style['cursor'] = 'pointer';
    } else {
      style['cursor'] = 'default';
    }
    return style;
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

