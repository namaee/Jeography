export class Question {
  name: string;
  kanjiName: string;
  id: number;

  constructor(name: string, kanjiName: string, id: number) {
    this.name = name;
    this.kanjiName = kanjiName;
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
  pickedAreaName: string;
  pickedKanjiName: string;
  tf: boolean;
  id: number;

  constructor(areaName: string, kanjiAreaName: string, pickedAreaName: string, pickedKanjiName: string, tf: boolean, id: number) {
    this.areaName = areaName;
    this.kanjiAreaName = kanjiAreaName;
    this.pickedAreaName = pickedAreaName;
    this.pickedKanjiName = pickedKanjiName;
    this.tf = tf;
    this.id = id;
  }
}

export class Settings {
  feedback: boolean;
  kanji: boolean;
  flag: boolean;
  kanjionly: boolean;
  
  constructor() {
    this.feedback = true;
    this.kanji = false;
    this.flag = false;
    this.kanjionly = false
  }
  public reset() {
    this.feedback = true;
    this.kanji = false;
    this.flag = false;
    this.kanjionly = false
  }
}

export enum GameState {
  OFF = 1,
  OCC = 2,
  END = 3,
}

export enum Mode {
  PREF = 1,
  REG = 2,
  CIT = 3,
}

export enum CType {
  DESIG = 1, //20
  CORE = 2, //62
  SPEC = 3, //23
  CITY = 4, //687
  WARD = 5, //23
}

export type Name = {name: string, kanjiName: string}
