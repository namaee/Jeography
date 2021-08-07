import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Subscription } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { GameState, Mode } from '../quiz';
import { MapService } from 'src/app/map/map.service';
import { prefectures, citiesSvg } from '../../data';
import { SelectionModel } from '@angular/cdk/collections';
import { MatListOption } from '@angular/material/list';
import { SettingsService } from '../settings/settings.service';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @ViewChild('settings') settings
  constructor(public qs: QuizService, public ms: MapService, public ss: SettingsService) { }

  ngOnInit(): void {
    

  }
  public startQuiz() {
    switch (this.ms.mode.value) {
      case Mode.PREF: if (this.ss.prefSelection.length > 0) this.qs.startQuiz(Mode.PREF); break;
      case Mode.CIT: if (this.ss.citSelection.length > 0) this.qs.startQuiz(Mode.CIT); break;

    }
  }
    
  public endQuiz() {
    this.qs.state = GameState.END
  }
  
  public get gameStateEnum(): typeof GameState {
    return GameState; 
  }

  public get modeEnum(): typeof Mode {
    return Mode; 
  }
}
