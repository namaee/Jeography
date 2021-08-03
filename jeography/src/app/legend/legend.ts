export class LegendEntry {
  name: string;
  kanjiName: string;
  hover: boolean;
  defaultColor: string;
  hoverColor: string;

  constructor(name: string, kanjiName: string) {
    this.name = name;
    this.kanjiName = kanjiName;
    this.hover = false;
    this.defaultColor = 'white';
    this.hoverColor = 'rgb(255, 198, 99)'
  }
}