import { Component, OnInit } from '@angular/core';
import { MapService } from '../map/map.service';
import { GameState, Mode } from '../quiz/quiz';
import { QuizService } from '../quiz/quiz.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public ms: MapService, public qs: QuizService) { }

  ngOnInit(): void {
  }

  switchMode(mode: Mode) {
    if (this.qs.state == GameState.OCC) return
    // this.ms.mode = mode;
    if (mode == Mode.REG) return;
    this.ms.mode.next(mode)
  }

  public modeSwitch(mode: Mode): { [key: string]: string } {
    const style: { [key: string]: string } = {};
    if (this.qs.state == GameState.OCC) {
      style['cursor'] = 'default'
    } else {
      style['cursor'] = 'pointer'
    }
    if (this.ms.mode.value == mode) {
      style['color'] = 'rgb(249, 231, 231)'

    }
    return style;
  }

  public get modeEnum(): typeof Mode {
    return Mode; 
  }
}
