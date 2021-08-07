import { Component, OnInit } from '@angular/core';
import { citiesSvg, prefectures } from '../data';
import { MapService } from '../map/map.service';
import { Mode } from '../quiz/quiz';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {
  public prefectures = prefectures;
  public citiesSvg = citiesSvg;

  constructor(public ms: MapService) {
  
  }

  ngOnInit(): void {
    this.citiesSvg.sort((a, b) => new Intl.Collator('jp').compare(a.title, b.title))
  }

  public setActive(name: string) {
    this.ms.setActive(name, Mode.CIT)
  }

  public formatKM(num) {
    num = num.toFixed(2).toString().replace('.', ',')
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  public formatMI(num) {
    num = (num / 2.58998811).toFixed(2).toString().replace('.', ',')
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  public formatPop(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  public toStandardLatin(name) {
    return (name.replace(/ō/g,'o')).replace(/Ō/g, 'O');
  }

  public get modeEnum(): typeof Mode {
    return Mode; 
  }
}
