import { Component, OnInit } from '@angular/core';

class Question {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}
@Component({
  selector: 'app-quiz-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  public question: Question;
  constructor() { }

  ngOnInit(): void {
    this.question = new Question("prefecture", 0)
  }

}
