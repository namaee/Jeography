import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { prefectures, citiesSvg } from '../data';
import { Question, Answer,  Settings, Score, GameState, Mode } from './quiz';


@Injectable()
export class QuizService implements OnInit {
  public state: GameState = 1;
  public quizControl: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public settings: Settings = new Settings();
  public questions: Question[] = [];
  public answers: Answer[] = [];
  public scores: Score[] = [];
  public scoreID: number = 0;
  public correctAmount: number = 0;
  public questionIndex: number = 0;
  
  constructor() {

  }
  ngOnInit(): void {
  }

  startQuiz(mode: Mode) {
    this.resetQuiz();
    this.createQuestions(mode)
    this.state = 2
  }
  public createQuestions(mode: Mode) {
    if (mode == Mode.PREF) {
      prefectures.forEach((prefecture, i) => {
        this.questions.push(new Question(prefecture.name, prefecture.kanjiName, i));
      })
    } else if (mode == Mode.CIT) {
      citiesSvg.forEach((city, i) => {
        this.questions.push(new Question(city.title, "kanji place holder",  i));
      })
    } 

    this.shuffle(this.questions);
  }

  public nextQuestion(ans: string) {
    if (this.state == 3) return
    let answer = new Answer(ans, ans == this.questions[this.questionIndex].name, this.questions[this.questionIndex].id)
    this.answers.push(answer)
    this.updateScore();
    if (this.questionIndex >= this.questions.length - 1) {
      this.state = 3
      this.scores.forEach((score) => {
        if (score.tf) {
          this.correctAmount++;
        }
      })    
      this.state = 3
      return;
    }
    this.questionIndex++
  }

  public resetQuiz() {
    this.state = 1;
    // this.settings.reset();
    this.questions = [];
    this.questionIndex = 0;
    this.answers = []
    this.scores = [];
    this.scoreID = 0;
    this.correctAmount = 0;
    // this.quizControl.next('reset');
  }

  
  public updateScore() {
    // this.qs.questions.slice(0, this.qs.questionIndex).forEach((question: Question) => {
    //   this.scores.
    // })
    this.scores.unshift(new Score(this.questions[this.questionIndex].name, this.questions[this.questionIndex].kanjiName, this.answers[this.questionIndex].tf, this.scoreID++))
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
