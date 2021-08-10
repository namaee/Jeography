import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { prefectures, citiesSvg } from '../data';
import { MapService } from '../map/map.service';
import { Question,  Settings, Score, GameState, Mode } from './quiz';
import { SettingsService } from './settings/settings.service';


@Injectable()
export class QuizService implements OnInit {
  public state: GameState = 1;
  public prefectures = prefectures;
  public citiesSvg = citiesSvg;
  public quizControl: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public settings: Settings = new Settings();
  public questionSelection: string[] = [];
  public questions: Question[] = [];
  public scores: Score[] = [];
  public scoreID: number = 0;
  public correctAmount: number = 0;
  public questionIndex: number = 0;
  public scoresWrong: string[] = [];
  constructor(private ss: SettingsService, private ms: MapService) {
    
  }
  ngOnInit(): void {
  }

  startQuiz(mode: Mode) {
    this.resetQuiz();
    this.createQuestions(mode)
    this.state = 2
    this.ss.lockSettings()
  }
  public createQuestions(mode: Mode) {
    if (mode == Mode.PREF) {
      prefectures.forEach((prefecture, i) => {
        if (this.questionSelection.includes(prefecture.name))
        this.questions.push(new Question(prefecture.name, prefecture.kanjiName, i));
      })
    } else if (mode == Mode.CIT) {
      citiesSvg.forEach((city, i) => {
        if (this.questionSelection.includes(city.title))
        this.questions.push(new Question(city.title, city.kanjiName, i));
      })
    } 

    this.shuffle(this.questions);
  }

  public nextQuestion(ans: string) {
    if (this.state == 3) return
    // let answer = new Answer(ans, ans == this.questions[this.questionIndex].name, this.questions[this.questionIndex].id)
    this.scores.unshift(new Score(
      this.questions[this.questionIndex].name, 
      this.questions[this.questionIndex].kanjiName, 
      ans, this.returnKanjiName(ans), 
      ans == this.questions[this.questionIndex].name, 
      this.scoreID++))
    if (ans != this.questions[this.questionIndex].name) {
      this.scoresWrong.push(this.questions[this.questionIndex].name)
    }
    // this.answers.push(answer)
    // this.updateScore();
    if (this.questionIndex >= this.questions.length - 1) {
      this.state = 3
      this.scores.forEach((score) => {
        if (score.tf) {
          this.correctAmount++;
        }
      })    
      this.questionIndex++
      this.state = 3
      this.ss.openSettings(3);
      return;
    }
    this.questionIndex++
  }

  public resetQuiz() {
    this.state = 1;
    this.questions = [];
    this.questionIndex = 0;
    this.scores = [];
    this.scoresWrong = [];
    this.scoreID = 0;
    this.correctAmount = 0;
    this.ss.openSettings(1);
  }

  public startQuizWrongAnswers(mode: Mode) {
    let wrongAnsers = this.scoresWrong
    for (let i = this.questionIndex; i < this.questions.length; i++) {
      wrongAnsers.push(this.questions[i].name)
    }
    this.resetQuiz();
    this.ss.wrongAnswers.next(wrongAnsers)
    this.createQuestions(mode) 
    this.state = 2
    this.ss.lockSettings()
  }

  public returnKanjiName(name: string) {
    if (this.ms.mode.value == Mode.PREF) {
      let prefecture = this.prefectures.find((prefecture) => {
        return prefecture.name == name;      
      })
      return prefecture.kanjiName;
    } else if (this.ms.mode.value == Mode.CIT) {
      let city = this.citiesSvg.find((city) => {
        return city.title == name;      
      })
      return city.kanjiName;
    }
  }

  public shuffle(ar) {
    var ci = ar.length, ri;
    while (0 !== ci) {
      ri = Math.floor(Math.random() * ci);
      ci--;
      [ar[ci], ar[ri]] = [
        ar[ri], ar[ci]];
    }
    return ar;
  }
}
