import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

  constructor(public qs: QuizService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.qs.quizControl.subscribe((msg: string) => {
      })
    )  
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
