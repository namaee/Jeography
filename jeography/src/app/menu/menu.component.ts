import { Component, OnInit } from '@angular/core';
import { MapService } from '../map/map.service';
import { Mode } from '../quiz/quiz';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public mapService: MapService) { }

  ngOnInit(): void {
  }

  switchMode(mode: Mode) {
    // this.mapService.mode = mode;
  }

  public get modeEnum(): typeof Mode {
    return Mode; 
  }
  
}
