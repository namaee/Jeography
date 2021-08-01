import { Component } from '@angular/core';

export enum State{
  VIEW = 1,
  STATE = 2
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public state: State = State.VIEW;
  
  public stateSwitch(state: State) {
    this.state = state;
  }
  public get stateEnum(): typeof State {
    return State; 
  }
}
