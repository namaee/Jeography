import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Subscription } from 'rxjs';

export class Question {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

export class Answer {
  name: string;
  tf: boolean;
  qid: number;
  constructor(name: string, tf: boolean, qid: number) {
    this.name = name;
    this.tf = tf;
    this.qid = qid;
  }
}
@Component({
  selector: 'app-quiz-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  constructor(public qs: QuizService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.qs.quizControl.subscribe((msg: string) => {
      })
    )  
  }

  public startQuiz() {
    this.qs.startQuiz();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
