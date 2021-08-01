import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { prefectures } from '../data';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  public prefectures = prefectures;
  private subscriptions: Subscription = new Subscription();
  public activePrefecture: string = '';
  public zoomLevel: number = 1;

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
}

