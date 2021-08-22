import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Subscription } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CType, GameState, Mode } from '../quiz';
import { MapService } from 'src/app/map/map.service';
import { prefectures, citiesSvg, regionSvg, prefecturesData} from '../../data';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-quiz-settings',
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public pickPanelExpanded: boolean = false;
  public view: number = 0;
  //mode: PREF
  @ViewChildren('prefSel') prefSel;
  public prefectures = prefectures;
  public prefecturesData = prefecturesData;
  //mode: CIT
  @ViewChildren('citSelfPref') citSelfPref;
  @ViewChildren('citSel') citSel;
  public citiesSvg = citiesSvg;
  public regionViewGroup: Map<string, {region: string, name: string, capital: boolean}[]> = new Map();
  public regionView: {region: string, name: string, capital: boolean}[] = []
  public cityTypeView: {cityType: string, name: string, capital: boolean}[]

  @ViewChildren('citSelType5') citSelType5;
  @ViewChildren('citSelType1') citSelType1;
  @ViewChildren('citSelType2') citSelType2;
  @ViewChildren('citSelType3') citSelType3;
  @ViewChildren('citSelType4') citSelType4;
  public citSelTypes = []

  //mode: REG
  public regionSvg = regionSvg;
  public regSelection: string[] = [];

  
  constructor(public qs: QuizService, public ms: MapService, public ss: SettingsService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.ms.mode.subscribe(() => {
        this.updateSelectionOnSwitch()
        this.cdr.detectChanges()
      })
    )  
    this.subscriptions.add(
      this.ss.gameState.subscribe(() => {
        this.cdr.detectChanges()
      })
    )
    this.subscriptions.add(
      this.ss.wrongAnswers.subscribe((event) => {
        if (event) this.fillWrongAnswers(event)
      })
    )
    this.prefectures.sort((a, b) => new Intl.Collator('jp').compare(a.name, b.name))
    this.prefectures.forEach((prefecture) => {
      this.ss.prefSelection.push(prefecture.name)
    })

    this.regionSvg.sort((a, b) => new Intl.Collator('jp').compare(a.title, b.title))
    this.regionSvg.forEach((region) => {
      this.regionViewGroup.set(region.title, [])
    })

    this.citiesSvg.sort((a, b) => new Intl.Collator('jp').compare(a.title, b.title)).forEach((city) => {
      this.regionViewGroup.get(this.prefToRegion(city.prefecture)).push({region: this.prefToRegion(city.prefecture), name: city.title, capital: city.capital})
    })
    this.citSelTypes = [this.citSelType1, this.citSelType2, this.citSelType3, this.citSelType4, this.citSelType5]

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
      if (this.view == 0) {
        this.citSelTypes.forEach((citSelType) => {
          citSelType?._results.forEach((selObj) => {
            if (selObj._checked) this.ss.citSelection.push(selObj.value)
          })
        })
      }
      else if (this.view == 1) {
        this.citSel?._results.forEach((selObj) => {
          if (selObj._checked) this.ss.citSelection.push(selObj.value)
        })
      }
      this.qs.questionSelection = this.ss.citSelection
      this.cdr.detectChanges()
    }
  }
  public updateSelectionOnSwitch() {
    if (this.ms.mode.value == Mode.PREF) {
      this.prefSel?._results.forEach((selObj) => {
        if (selObj._checked) {
          let i = this.ss.prefSelection.indexOf(selObj.value)
          if (i == -1) this.ss.prefSelection.push(selObj.value)
        }
      })
      this.qs.questionSelection = this.ss.prefSelection
    } else if (this.ms.mode.value == Mode.CIT) {
      if (this.view == 0) {
        this.citSelTypes.forEach((citSelType) => {
          citSelType?._results.forEach((selObj) => {
            if (selObj._checked) {
              let i = this.ss.citSelection.indexOf(selObj.value)
              if (i == -1) this.ss.citSelection.push(selObj.value)
            }
          })
        })
      }
      else if (this.view == 1) {
        this.citSel?._results.forEach((selObj) => {
          if (selObj._checked) this.ss.citSelection.push(selObj.value)
        })
      }
      this.qs.questionSelection = this.ss.citSelection
      this.cdr.detectChanges()
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
      this.citSelTypes.forEach((citSelType) => {
        citSelType?._results.forEach((selObj) => {
          selObj._checked = true;
        })
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
      this.citSelTypes.forEach((citSelType) => {
        citSelType?._results.forEach((selObj) => {
          selObj._checked = false;
        })
      })
    }
    this.updateSelection();
  }
  
  public selectAllC() {
    this.citSel._results.forEach((selObj) => {
      if (this.lookUpCapital(selObj.value)) selObj._checked = true;
    })
    this.citSelTypes.forEach((citSelType) => {
      citSelType?._results.forEach((selObj) => {
        if (this.lookUpCapital(selObj.value)) selObj._checked = true;
      })
    })
    this.updateSelection();
  }

  public deselectAllC() {
    this.citSel._results.forEach((selObj) => {
      if (this.lookUpCapital(selObj.value)) selObj._checked = false;
    })
    this.citSelTypes.forEach((citSelType) => {
      citSelType?._results.forEach((selObj) => {
        if (this.lookUpCapital(selObj.value)) selObj._checked = false;
      })
    })
    this.updateSelection();
  }


  public checkIndeterminate(name: string) {
    if (this.ms.mode.value == Mode.PREF) {

    } else if (this.ms.mode.value == Mode.CIT) {
      let cc = 0;
      let oc = 0;
      this.citSel?._results.forEach((selObj) => {
        if (this.prefToRegion(this.lookUpPref(selObj.value)) == name) {
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
  
  public checkIndeterminateType(type: CType) {
    let cc = 0;
    let oc = 0;
    this.citSelTypes[type-1]?._results.forEach((selObj) => {
      oc++;
      if (selObj._checked == true) {
        cc++;
      }
    })
    if (cc == oc || cc == 0) return false
    return true;
  }

  public selectAllSubChoice(name: string, checked: boolean) {
    if (this.ms.mode.value == Mode.PREF) {

    } else if (this.ms.mode.value == Mode.CIT) {
      this.citSel?._results.forEach((selObj) => {
        if (this.prefToRegion(this.lookUpPref(selObj.value)) == name) {
          selObj._checked = checked;
        }
      })
    }
    this.updateSelection();
  }

  public selectAllSubChoiceType(type: CType, checked: boolean) {
    this.citSelTypes[type-1]?._results.forEach((selObj) => {
      selObj._checked = checked;
    })
    
    this.updateSelection();
  }
  public checkAllCompleted(name: string) {
    if (this.ms.mode.value == Mode.PREF) {

    } else if (this.ms.mode.value == Mode.CIT) {
      let cc = 0;
      let oc = 0;
      this.citSel?._results.forEach((selObj) => {
        if (this.prefToRegion(this.lookUpPref(selObj.value)) == name) {
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

  public checkAllCompletedType(type: CType) {
    let cc = 0;
    let oc = 0;
    this.citSelTypes[type-1]?._results.forEach((selObj) => {
      oc++;
      if (selObj._checked == true) {
        cc++;
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
    
    return res?.prefecture;
  }

  public prefToRegion(name: string) {
    let pref = this.prefecturesData.find((prefecture) => {
      return prefecture.name == name;      
    })
    return pref.region
  }

  public swapView() {
    this.view = (this.view + 1) % 2;    
    setTimeout(() => {this.cdr.detectChanges();}, 150);
  }
  
  public togglePickPanel(){ 
    this.pickPanelExpanded = !this.pickPanelExpanded
  }

  public onSettingChange(event: MatCheckboxChange) {
    switch (event.source.value) {
      case "feedback": this.qs.settings.feedback = event.checked; break;
      case "kanji": this.qs.settings.kanji = event.checked; break;
      case "flag": this.qs.settings.flag = event.checked; break;
      case "kanjionly": this.qs.settings.kanjionly = event.checked; break;
      case "cityTypes": this.qs.settings.cityTypes = event.checked; break;
      default: 
    }
  }

  public fillWrongAnswers(names: string[]) {
    this.deselectAll();
    if (this.ms.mode.value == Mode.PREF) {
      this.prefSel._results.forEach((selObj) => {
        if (names.includes(selObj.value)) {
          selObj._checked = true};
      })
    } else if (this.ms.mode.value == Mode.CIT) {
      this.citSel._results.forEach((selObj) => {
        if (names.includes(selObj.value)) selObj._checked = true;
      })
      this.citSelTypes.forEach((citSelType) => {
        citSelType?._results.forEach((selObj) => {
          if (names.includes(selObj.value)) selObj._checked = true;
        })
      })
    }
    this.updateSelection();
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
