import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { prefectures, citiesSvg } from '../data';


@Injectable()
export class SearchService   {
  public searchControl = new FormControl();
  
  constructor() {

  }
  ngOnInit(): void {
  }

  public toStandardLatin(name) {
    return (name.replace(/ō/g,'o')).replace(/Ō/g, 'O').replace(/ū/g,'u').replace(/Ū/g, 'U');
  }

  
  public searchSubstring(name: string): boolean {
    let query = this.searchControl.value
    if (query) {
      return this.toStandardLatin(name.toLowerCase()).includes(this.toStandardLatin(query.toLowerCase()))
    }
    return true;
  }
}
