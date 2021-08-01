import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { prefectures } from '../data';
import { MapService } from './map.service';
import { MapDragDirective } from './mapDrag.directive';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild(MapDragDirective)
  public mapDrag: MapDragDirective;

  public prefectures = prefectures;
  private subscriptions: Subscription = new Subscription();
  public activePrefecture: string = '';
  public zoomLevel: number = 1;

  private mouseWheel: Subject<WheelEvent> = new Subject<WheelEvent>();

  @HostListener('document:wheel', ['$event'])
  public onMouseWheel(event: WheelEvent): void {
    this.mouseWheel.next(event);
  }
  
  constructor(private elementRef: ElementRef, public mapService: MapService) {
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
    /* Mouse Wheel Event */
    this.mouseWheel.asObservable().subscribe((event) => {
      this.mapDrag.checkMousePosition(event);

      if (this.mapDrag.mouseOnCanvas) {
        if (event.deltaY < 0) {
          event.preventDefault();
          this.onZoomIn();
        } else {
          event.preventDefault();
          this.onZoomOut();
        }
      }
    });
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
    this.zoomLevel = this.zoomLevel * 1.5;

  }

  public onZoomOut() {
    this.zoomLevel = this.zoomLevel / 1.5;
  }
  public onLeave() {
    this.mapService.prefectureLeave();
  }

  public get mapStyle(): { [key: string]: string } {
    const style: { [key: string]: string } = {};
    style['transform'] = 'scale(' + this.zoomLevel + ')';
    // style['transform-origin'] = 'center';
    style['stroke'] = 'rgb(242, 242, 242)';
    style['stroke-width'] =  0.65 / this.zoomLevel + 'px';
    return style;
  }
}

