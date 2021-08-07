import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SettingsService {
  public prefSelection: string[] = [];
  public citSelection: string[] = [];

  constructor() {
  }

}
