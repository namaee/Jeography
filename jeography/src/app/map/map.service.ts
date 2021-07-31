import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class MapService {
  public hover: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor() {

  }
  prefectureHover(prefecture: string) {
    this.prefectureLeave();
    this.hover.next(prefecture)
  }
  prefectureLeave() {
    this.hover.next(null)
  }
}
