export class LegendEntry {
  name: string;
  hover: boolean;
  defaultColor: string;
  hoverColor: string;

  constructor(name: string) {
    this.name = name;
    this.hover = false;
    this.defaultColor = 'white';
    this.hoverColor = 'rgb(255, 198, 99)'
  }
}