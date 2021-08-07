import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Subscription } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { GameState, Mode } from '../quiz';
import { MapService } from 'src/app/map/map.service';
import { prefectures, citiesSvg } from '../../data';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-quiz-settings',
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();
  public pickPanelExpanded: boolean = false;
  //mode: PREF
  @ViewChildren('prefSel') prefSel;
  public prefectures = prefectures;
  //mode: CIT
  @ViewChildren('citSelfPref') citSelfPref;
  @ViewChildren('citSel') citSel;
  public citiesSvg = citiesSvg;
  public prefectureViewGroup: Map<string, {prefecture: string, name: string, capital: boolean}[]> = new Map();
  public prefectureView: {prefecture: string, name: string, capital: boolean}[] = []
  public cityTypeView: {cityType: string, name: string, capital: boolean}[]
  //mode: REG
  public regSelection: string[] = [];

  
  constructor(public qs: QuizService, public ms: MapService, public ss: SettingsService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.ms.mode.subscribe(() => {
        this.cdr.detectChanges()
      })
    )  
    this.prefectures.sort((a, b) => new Intl.Collator('jp').compare(a.name, b.name))
    this.prefectures.forEach((prefecture) => {
      this.prefectureViewGroup.set(prefecture.name, [])
      this.ss.prefSelection.push(prefecture.name)
    })
    citiesSvg.sort((a, b) => new Intl.Collator('jp').compare(a.title, b.title)).forEach((city) => {
      this.prefectureViewGroup.get(city.prefecture).push({prefecture: city.prefecture, name: city.title, capital: city.capital})
    })
  }

  public updateSelection() {
    if (this.ms.mode.value == Mode.PREF) {
      this.ss.prefSelection = [];
      this.prefSel?._results.forEach((selObj) => {
        if (selObj._checked) this.ss.prefSelection.push(selObj.value)
        
      })
      this.qs.questionSelection = this.ss.prefSelection
    } else if (this.ms.mode.value == Mode.CIT) {
      this.ss.citSelection = [];
      this.citSel?._results.forEach((selObj) => {
        if (selObj._checked) this.ss.citSelection.push(selObj.value)
      })
      this.qs.questionSelection = this.ss.citSelection

    }

  }

  public selectAll() {
    if (this.ms.mode.value == Mode.PREF) {
      this.prefSel._results.forEach((selObj) => {
        selObj._checked = true;
      })
    } else if (this.ms.mode.value == Mode.CIT) {
      this.citSel._results.forEach((selObj) => {
        selObj._checked = true;
      })
    }
    this.updateSelection();
  }

  public deselectAll() {
    if (this.ms.mode.value == Mode.PREF) {
      this.prefSel._results.forEach((selObj) => {
        selObj._checked = false;
      })
    } else if (this.ms.mode.value == Mode.CIT) {
      this.citSel._results.forEach((selObj) => {
        selObj._checked = false;
      })
    }
    this.updateSelection();
  }
  
  public selectAllC() {
    this.citSel._results.forEach((selObj) => {
      if (this.lookUpCapital(selObj.value)) selObj._checked = true;
    })
    this.updateSelection();
  }

  public deselectAllC() {
    this.citSel._results.forEach((selObj) => {
      if (this.lookUpCapital(selObj.value)) selObj._checked = false;
    })
    this.updateSelection();
  }


  public checkIndeterminate(name: string) {
    if (this.ms.mode.value == Mode.PREF) {

    } else if (this.ms.mode.value == Mode.CIT) {
      let cc = 0;
      let oc = 0;
      this.citSel?._results.forEach((selObj) => {
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
  }

  public selectAllSubChoice(name: string, checked: boolean) {
    if (this.ms.mode.value == Mode.PREF) {

    } else if (this.ms.mode.value == Mode.CIT) {
      this.citSel?._results.forEach((selObj) => {
        if (this.lookUpPref(selObj.value) == name) {
          selObj._checked = checked;
        }
      })
    }
    this.updateSelection();
  }

  public checkAllCompleted(name: string) {
    if (this.ms.mode.value == Mode.PREF) {

    } else if (this.ms.mode.value == Mode.CIT) {
      let cc = 0;
      let oc = 0;
      this.citSel?._results.forEach((selObj) => {
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
    
    return res?.prefecture;
  }

  public togglePickPanel(){ 
    this.pickPanelExpanded = !this.pickPanelExpanded
  }

  public onSettingChange(event: MatCheckboxChange) {
    switch (event.source.value) {
      case "feedback": this.qs.settings.feedback = event.checked; break;
      case "kanji": this.qs.settings.kanji = event.checked; break;
      default: 
    }
  }

  public setDescription() {
    if (this.ms.mode.value == Mode.PREF) {
      if (this.ss.prefSelection.length == 1) {
        return "1 prefecture selected"
      } else {
        return this.ss.prefSelection.length + " prefectures selected"
      }
    } else if (this.ms.mode.value == Mode.CIT) {
      if (this.ss.prefSelection.length == 1) {
        return "1 city selected"
      } else {
        return this.ss.citSelection.length + " cities selected"
      }
    }
  }
  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public get gameStateEnum(): typeof GameState {
    return GameState; 
  }

  public get modeEnum(): typeof Mode {
    return Mode; 
  }

}
