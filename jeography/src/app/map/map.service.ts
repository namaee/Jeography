import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { prefectures, prefecturesData, regionSvg } from '../data';
import { Mode, Prefecture, Region } from '../quiz/quiz';

@Injectable()
export class MapService {
  public hover: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public prefectures = prefectures
  public prefecturesData = prefecturesData
  public regionsData = regionSvg;
  public activePrefectureData: {name: string, capital: string, region: string, island: string, area: number, population: number, flower: string}; 
  public activePrefecture: Prefecture;
  public activeRegion: Region;

  constructor() {

  }

  public setActive(pref: string, mode: Mode) {
    if (mode == Mode.PREF) {
      this.activePrefecture = this.prefectures.find((prefecture) => {
        return prefecture.name == pref;      
      })
      this.activePrefectureData = this.prefecturesData.find((prefecture) => {
        return prefecture.name == pref;      
      })
    } else if (mode == Mode.REG) {

    }
    
  }
}
