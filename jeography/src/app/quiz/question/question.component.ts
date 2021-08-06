import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Subscription } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Mode } from '../quiz';
import { MapService } from 'src/app/map/map.service';
import { prefectures, citiesSvg } from '../../data';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public pickPanelExpanded: boolean = false;
  public prefectures = prefectures;
  public citiesSvg = citiesSvg;
  constructor(public qs: QuizService, public ms: MapService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.qs.quizControl.subscribe((msg: string) => {
      })
    )  
  }

  public startQuiz() {
    switch (this.ms.mode) {
      case Mode.PREF: this.qs.startQuiz(Mode.PREF); break;
      case Mode.CIT: this.qs.startQuiz(Mode.CIT); break;

    }
    
  }

  public togglePickPanel(){ 
    this.pickPanelExpanded = !this.pickPanelExpanded
  }
  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onSettingChange(event: MatCheckboxChange) {
    switch (event.source.value) {
      case "feedback": this.qs.settings.feedback = event.checked; break;
      case "kanji": this.qs.settings.kanji = event.checked; break;
      default: 
    }
  }
}
