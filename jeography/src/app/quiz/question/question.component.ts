import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Subscription } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Mode } from '../quiz';
import { MapService } from 'src/app/map/map.service';
import { prefectures, citiesSvg } from '../../data';
import { SelectionModel } from '@angular/cdk/collections';
import { MatListOption } from '@angular/material/list';

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
  public selections: {checked: boolean, name: string}[] = [];
  
  @ViewChildren('sel') sel;
  constructor(public qs: QuizService, public ms: MapService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.qs.quizControl.subscribe((msg: string) => {
      })
    )  
    citiesSvg.forEach((city) => {
      this.selections.push({checked: false, name: city.title})
    })
  }

  public startQuiz() {
    switch (this.ms.mode) {
      case Mode.PREF: this.qs.startQuiz(Mode.PREF); break;
      case Mode.CIT: this.qs.startQuiz(Mode.CIT); break;

    }
  }

  public selectAll() {
    this.sel._results.forEach((selObj) => {
      selObj._checked = true;
    })
  }
  public deselectAll() {
    this.sel._results.forEach((selObj) => {
      selObj._checked = false;
    })
  }
  
  
  public selectAllC() {
    
  }
  public deselectAllC() {
    
  }

  public fillSelect(name: string) {
    this.selections.forEach((selection) => {
      if (selection.name == name) {
        return selection.checked;
      }
    })
  }

  public checkSelect(name: string) {
    this.selections.forEach((selection) => {
      if (selection.name == name) {
        selection.checked = !selection.checked
      }
    })
    console.log(this.sel._results);    
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
