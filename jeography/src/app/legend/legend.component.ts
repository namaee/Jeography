import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { prefectures } from '../data';
import { MapService } from '../map/map.service';
import { LegendEntry } from './legend';
@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {
  public prefectures: LegendEntry[] = [];
  private subscriptions: Subscription = new Subscription();

  
  constructor(public mapService: MapService) {
    this.subscriptions.add(
      this.mapService.hover.subscribe((prefecture: string) => {
        if (prefecture) {
          this.setHoverColor(prefecture);
        } else {
          this.resetHoverColor();
        }
      })
    )  
  }

  ngOnInit(): void {
    prefectures.forEach((prefecture: string) => {
      this.prefectures.push(new LegendEntry(prefecture))
    })
  }

  public setHoverColor(name: string) {
    if (this.prefectures && name) {
      this.prefectures.find((prefecture) => prefecture.name == name).hover = true;
    }
  }

  public resetHoverColor() {
    this.prefectures.forEach((prefecture) => {
      prefecture.hover = false;
    })
  }
}
