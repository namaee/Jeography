import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { prefectures } from '../data';
import { MapService } from '../map/map.service';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {
  public prefectures = prefectures;

  constructor(public mapService: MapService) {
  
  }

  ngOnInit(): void {

  }


}
