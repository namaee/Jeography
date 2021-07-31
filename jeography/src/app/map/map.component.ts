import { R3TargetBinder } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  public map = '../../assets/japan.svg';
  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = '#2b2b2b';
}

  public test(event: MouseEvent){
    let path = event.target as SVGPathElement
    if (path.hasAttribute('title')) {
      console.log(path.getAttribute('title'));

    } else {
      console.log("NO PREFECTURE");
    }
    
  }
}
