import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Question } from '../question/question.component';
import { QuizService } from '../quiz.service';

export class Score {
  areaName: string;
  id: number;

  constructor(areaName: string, id: number) {
    this.areaName = areaName;
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
  constructor(private qs: QuizService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.qs.quizControl.subscribe((msg: string) => {
        if (msg == 'next') {
          this.updateScore();
        } else {
        }
      })
    )  
  }

  public updateScore() {
    // this.qs.questions.slice(0, this.qs.questionIndex).forEach((question: Question) => {
    //   this.scores.
    // })
    this.scores.unshift(new Score(this.qs.questions[this.qs.questionIndex - 1].name, 0))
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
