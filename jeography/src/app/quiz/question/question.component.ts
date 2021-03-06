import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { GameState, Mode } from '../quiz';
import { MapService } from 'src/app/map/map.service';
import { SettingsService } from '../settings/settings.service';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  constructor(public qs: QuizService, public ms: MapService, public ss: SettingsService) { }

  ngOnInit(): void {
  }

  public startQuiz() {
    switch (this.ms.mode.value) {
      case Mode.PREF: {
        this.qs.questionSelection = this.ss.prefSelection 
        if (this.ss.prefSelection.length > 0) this.qs.startQuiz(Mode.PREF);
        break;
       }
      case Mode.CIT: {
        this.qs.questionSelection = this.ss.citSelection 
        if (this.ss.citSelection.length > 0) this.qs.startQuiz(Mode.CIT); 
        break;
      }
    }
  }
    
  public startQuizWrongAnswers() {
    switch (this.ms.mode.value) {
      case Mode.PREF: {
        this.qs.questionSelection = this.ss.prefSelection 
        if (this.ss.prefSelection.length > 0) this.qs.startQuizWrongAnswers(Mode.PREF);
        break;
       }
      case Mode.CIT: {
        this.qs.questionSelection = this.ss.citSelection 
        if (this.ss.citSelection.length > 0) this.qs.startQuizWrongAnswers(Mode.CIT); 
        break;
      }
    }
  }

  public endQuiz() {
    this.qs.state = GameState.END
    this.ss.openSettings(this.qs.state)
  }

  public get gameStateEnum(): typeof GameState {
    return GameState; 
  }

  public get modeEnum(): typeof Mode {
    return Mode; 
  }

  public toStandardLatin(name) {
    return (name.replace(/ō/g,'o')).replace(/Ō/g, 'O');
  }
}
