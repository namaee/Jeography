import { Component } from '@angular/core';
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
  constructor(private qs: QuizService) {

  }
  public stateSwitch(state: State) {
    this.state = state;
    if (state == State.QUIZ) {
      this.qs.resetQuiz();
    }
  }
  public get stateEnum(): typeof State {
    return State; 
  }
}
