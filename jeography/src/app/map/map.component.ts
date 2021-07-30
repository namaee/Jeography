import { R3TargetBinder } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public map = '../../assets/japan.svg';
  constructor() { }

  ngOnInit(): void {
  }

  public test(event: MouseEvent){
    let path = event.target as SVGPathElement
    console.log(path.getAttribute('title'));
    
  }
}
