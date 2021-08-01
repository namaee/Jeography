import { Component } from '@angular/core';

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
  
  public stateSwitch(state: State) {
    this.state = state;
  }
  public get stateEnum(): typeof State {
    return State; 
  }
}
