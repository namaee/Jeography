import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameState } from '../quiz';

@Injectable()
export class SettingsService {

  public prefSelection: string[] = [];
  public citSelection: string[] = [];
  public gameState: BehaviorSubject<GameState> = new BehaviorSubject<GameState>(null)
  public wrongAnswers: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(null)

  constructor() {
  }

  lockSettings() {
    this.gameState.next(2)
  }
  openSettings(state: GameState) {
    this.gameState.next(state)
  }
}
