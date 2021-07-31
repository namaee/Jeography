import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { prefectures } from '../data';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  public map = '../../assets/japan.svg';
  public prefectures = prefectures;
  constructor(private elementRef: ElementRef, public mapService: MapService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = '#2b2b2b';
}

  public onClick(event: MouseEvent){
    let path = event.target as SVGPathElement
    if (path.hasAttribute('title')) {
      console.log(path.getAttribute('title'));
    } else {
      console.log("NO PREFECTURE");
    }
  }

  public onHover(event: MouseEvent){
    let path = event.target as SVGPathElement
    if (path.hasAttribute('title')) {
      this.mapService.prefectureHover(path.getAttribute('title'))
      // console.log(path.getAttribute('title'));
    } 
  }

  public onLeave(event: MouseEvent){
    console.log('LEAVE');
    this.mapService.prefectureLeave()

  }
}
