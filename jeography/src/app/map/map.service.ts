import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { prefectures, prefecturesData, regionSvg, citiesSvg} from '../data';
import { Mode, Name } from '../quiz/quiz';

@Injectable()
export class MapService {
  public hover: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public mode: BehaviorSubject<Mode> = new BehaviorSubject<Mode>(Mode.PREF)
  public prefectures = prefectures
  public prefecturesData = prefecturesData
  public citiesSvg = citiesSvg
  public regionsData = regionSvg;
  public activePrefectureData: {name: string, capital: string, region: string, island: string, area: number, population: number, flower: string}; 
  public activePrefecture: Name;
  public activeCity: typeof citiesSvg[0] = null;
  public activeRegion: Name;

  constructor() {
  }

  public setActive(name: string) {
    if (this.mode.value == Mode.PREF) {
      if (name != this.activePrefecture?.name) {
        this.activePrefecture = this.prefectures.find((prefecture) => {
          return prefecture.name == name;      
        })
        this.activePrefectureData = this.prefecturesData.find((prefecture) => {
          return prefecture.name == name;      
        })
      } else {
        this.activePrefecture = null;
        this.activePrefectureData = null;
      }
    } else if (this.mode.value  == Mode.CIT) {
      if (name != this.activeCity?.title) {
        this.activeCity = this.citiesSvg.find((city) => {
          return city.title == name;      
        })
      } else {
        this.activeCity = null;
      }
    }
  }
}
