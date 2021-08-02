import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Question } from '../question/question.component';
import { QuizService } from '../quiz.service';

export class Score {
  areaName: string;
  tf: boolean;
  id: number;

  constructor(areaName: string, tf: boolean, id: number) {
    this.areaName = areaName;
    this.tf = tf;
    this.id = id;
  }
}
@Component({
  selector: 'app-quiz-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public scores: Score[] = [];
  public scoreID: number = 0;
  constructor(private qs: QuizService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.qs.quizControl.subscribe((msg: string) => {
        switch (msg) {
          case "next": this.updateScore(); break;
          case "reset": this.resetScore(); break;
          default: ;
        }
      })
    )  
  }

  public updateScore() {
    // this.qs.questions.slice(0, this.qs.questionIndex).forEach((question: Question) => {
    //   this.scores.
    // })
    this.scores.unshift(new Score(this.qs.questions[this.qs.questionIndex - 1].name, this.qs.answers[this.qs.questionIndex - 1].tf, this.scoreID++))
  }

  public resetScore() {
    // this.scores.forEach(() => {
    //   this.scores.pop();
    // })
    this.scores = [];
  }
  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
