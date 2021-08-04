import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { prefectures, prefecturesData } from '../data';
import { Prefecture } from '../quiz/quiz';

@Injectable()
export class MapService {
  public hover: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public prefectures = prefectures
  public prefecturesData = prefecturesData
  public activePrefectureData: {name: string, capital: string, region: string, island: string, area: number, population: number, flower: string}; 
  public activePrefecture: Prefecture;

  constructor() {

  }

  public setActivePrefecture(pref: string) {
    this.activePrefecture = this.prefectures.find((prefecture) => {
      return prefecture.name == pref;      
    })
    this.activePrefectureData = this.prefecturesData.find((prefecture) => {
      return prefecture.name == this.activePrefecture.macron;      
    })
  }
}
