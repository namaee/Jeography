import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { prefectures } from '../data';
import { Prefecture } from '../quiz/quiz';

@Injectable()
export class MapService {
  public hover: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public prefectures = prefectures
  public activePrefecture: Prefecture;

  constructor() {

  }

  public setActivePrefecture(pref: string) {
    this.activePrefecture = this.prefectures.find((prefecture) => {
      return prefecture.name == pref;      
    })
  }
}
