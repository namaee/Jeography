import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question } from './question/question.component';
import { prefectures } from '../data';


@Injectable()
export class QuizService implements OnInit {
  public state: boolean = false;
  public quizControl: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public questions: Question[] = [];
  public questionIndex: number = 0;
  
  constructor() {

  }
  ngOnInit(): void {
  }

  startQuiz() {
    this.createQuestions()
    this.state = true
  }
  public createQuestions() {
    prefectures.forEach((prefecture, i) => {
      this.questions.push(new Question(prefecture, i));
    })
    this.shuffle(this.questions);
  }

  public nextQuestion() {
    this.questionIndex++
    this.quizControl.next('next')
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
