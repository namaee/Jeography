import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class ColorService {
  public currentThemeIndex = 0;
  public mapTheme: {fill: string, stroke: string}[] = [
    {fill: 'rgb(255, 198, 99)', stroke: 'rgb(242, 242, 242)'},
    {fill: 'rgb(27, 27, 27)', stroke: 'rgb(128, 128, 128)'}
  ]
  constructor() {

  }
  ngOnInit(): void {
  }


}
