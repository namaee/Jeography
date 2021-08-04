export class Question {
  name: string;
  kanjiName: string;
  macron: string;
  id: number;

  constructor(name: string, kanjiName: string, macron: string, id: number) {
    this.name = name;
    this.kanjiName = kanjiName;
    this.macron = macron;
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

export class Score {
  areaName: string;
  kanjiAreaName: string;
  macronAreaName: string;
  tf: boolean;
  id: number;

  constructor(areaName: string, kanjiAreaName: string, macronAreaName: string, tf: boolean, id: number) {
    this.areaName = areaName;
    this.kanjiAreaName = kanjiAreaName;
    this.macronAreaName = macronAreaName;
    this.tf = tf;
    this.id = id;
  }
}

export class Settings {
  feedback: boolean;
  kanji: boolean;
  
  constructor() {
    this.feedback = true;
    this.kanji = false;
  }
  public reset() {
    this.feedback = true;
    this.kanji = false;
  }
}

export enum GameState {
  OFF = 1,
  OCC = 2,
  END = 3,
}

export type Prefecture = {name: string, kanjiName: string, macron: string}