import { Component } from '@angular/core';
import { ColorService } from './color.service';
import { MapService } from './map/map.service';
import { GameState } from './quiz/quiz';
import { QuizService } from './quiz/quiz.service';

export enum State{
  VIEW = 1,
  QUIZ = 2
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public state: State = State.VIEW;
  public location = location;
  public console = console
  constructor(private qs: QuizService, private ms: MapService, public cs: ColorService) {

  }
  public stateSwitch(state: State) {
    if (this.state == State.QUIZ && state == State.VIEW && this.qs.state == GameState.OCC) {
      if (confirm("Test progress will be lost.")) {
        this.state = state;
        this.qs.resetQuiz();
      }  
      return;
    }
    this.state = state;
    if (state == State.QUIZ) {
      this.ms.activeCity = null;
      this.qs.resetQuiz();
    }
  }

  public changeMapTheme() {
    this.cs.currentThemeIndex = (this.cs.currentThemeIndex + 1) % 2;    
  }

  public get stateEnum(): typeof State {
    return State; 
  }
}
