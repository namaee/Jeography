import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Subscription } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { GameState, Mode } from '../quiz';
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
  public prefectureViewGroup: Map<string, {prefecture: string, name: string, capital: boolean}[]> = new Map();
  public prefectureView: {prefecture: string, name: string, capital: boolean}[] = []
  public cityTypeView: {cityType: string, name: string, capital: boolean}[]
  
  @ViewChildren('selPref') selPref;
  @ViewChildren('sel') sel;
  constructor(public qs: QuizService, public ms: MapService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    
    this.subscriptions.add(
      this.qs.quizControl.subscribe((msg: string) => {
      })
    )
    this.prefectures.forEach((prefecture) => {
      this.prefectureViewGroup.set(prefecture.name, [])
    })

    citiesSvg.sort((a, b) => new Intl.Collator('jp').compare(a.title, b.title)).forEach((city) => {
      this.prefectureViewGroup.get(city.prefecture).push({prefecture: city.prefecture, name: city.title, capital: city.capital})
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
    this.sel._results.forEach((selObj) => {
      if (this.lookUpCapital(selObj.value)) selObj._checked = true;
    })
  }

  public deselectAllC() {
    this.sel._results.forEach((selObj) => {
      if (this.lookUpCapital(selObj.value)) selObj._checked = false;
    })
  }


  public checkIndeterminate(name: string) {
    let cc = 0;
    let oc = 0;
    this.sel?._results.forEach((selObj) => {
      if (this.lookUpPref(selObj.value) == name) {
        oc++;
        if (selObj._checked == true) {
          cc++;
        }
      }
    })
    if (cc == oc || cc == 0) return false
    return true;
  }

  public selectAllSubChoice(name: string, checked: boolean) {
    this.sel?._results.forEach((selObj) => {
      if (this.lookUpPref(selObj.value) == name) {
        selObj._checked = checked;
      }
    })
  }

  public checkAllCompleted(name: string) {
    let cc = 0;
    let oc = 0;
    this.sel?._results.forEach((selObj) => {
      if (this.lookUpPref(selObj.value) == name) {
        oc++;
        if (selObj._checked == true) {
          cc++;
        }
      }
    })
    if (cc == oc && oc != 0) return true
    return false;
  }
  //value is name
  public lookUpCapital(name: string) {
    let res = this.citiesSvg.find((city) => {
      return city.title == name;      
    })
    return res.capital;
  }

  public lookUpPref(name: string) {
    let res = this.citiesSvg.find((city) => {
      return city.title == name;      
    })
    return res.prefecture;
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
    
  public get gameStateEnum(): typeof GameState {
    return GameState; 
  }
}
