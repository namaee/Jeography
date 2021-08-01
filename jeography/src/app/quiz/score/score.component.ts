import { Component, OnInit } from '@angular/core';

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
export class ScoreComponent implements OnInit {
  public scores: Score[] = [];
  constructor() { }

  ngOnInit(): void {
    this.scores.push(new Score("prefecture1", 1))
    this.scores.push(new Score("prefecture2", 2))
    this.scores.push(new Score("prefecture3", 3))
    this.scores.push(new Score("prefecture1", 1))
    this.scores.push(new Score("prefecture2", 2))
    this.scores.push(new Score("prefecture3", 3))
    this.scores.push(new Score("prefecture1", 1))
    this.scores.push(new Score("prefecture2", 2))
    this.scores.push(new Score("prefecture3", 3))
    this.scores.push(new Score("prefecture1", 1))
    this.scores.push(new Score("prefecture2", 2))
    this.scores.push(new Score("prefecture3", 3))
    this.scores.push(new Score("prefecture1", 1))
    this.scores.push(new Score("prefecture2", 2))
    this.scores.push(new Score("prefecture3", 3))
    this.scores.push(new Score("prefecture1", 1))
    this.scores.push(new Score("prefecture2", 2))
    this.scores.push(new Score("prefecture3", 3))
    this.scores.push(new Score("prefecture1", 1))
    this.scores.push(new Score("prefecture2", 2))
    this.scores.push(new Score("prefecture3", 3))
    this.scores.push(new Score("prefecture1", 1))
    this.scores.push(new Score("prefecture2", 2))
    this.scores.push(new Score("prefecture3", 3))
    this.scores.push(new Score("prefecture1", 1))
    this.scores.push(new Score("prefecture2", 2))
    this.scores.push(new Score("prefecture3", 3))
    this.scores.push(new Score("prefecture1", 1))
    this.scores.push(new Score("prefecture2", 2))
    this.scores.push(new Score("prefecture3", 3))
    
  }
}
