import { Component } from '@angular/core';
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
  public state: State = State.QUIZ;
  public location = location;
  public console = console
  constructor(private qs: QuizService, private ms: MapService) {

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
  public get stateEnum(): typeof State {
    return State; 
  }
}
