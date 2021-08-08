import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { citiesSvg, prefectures, prefecturesData, regionSvg } from '../data';
import { MapService } from '../map/map.service';
import { Mode } from '../quiz/quiz';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {
  public prefectures = prefectures;
  public prefecturesData = prefecturesData;
  public citiesSvg = citiesSvg;
  public regionSvg = regionSvg;

  public view: number = 0;

  public regionViewGroup: Map<string, {region: string, name: string, capital: boolean}[]> = new Map();
  public regionView: {region: string, name: string, capital: boolean}[] = []
  public cityTypeView: {cityType: string, name: string, capital: boolean}[]

  constructor(public ms: MapService, public cdr: ChangeDetectorRef) {
  
  }

  ngOnInit(): void {
    this.citiesSvg.sort((a, b) => new Intl.Collator('jp').compare(a.title, b.title))
    this.prefectures.sort((a, b) => new Intl.Collator('jp').compare(a.name, b.name))
    this.regionSvg.sort((a, b) => new Intl.Collator('jp').compare(a.title, b.title))

    this.regionSvg.forEach((region) => {
      this.regionViewGroup.set(region.title, [])
    })
    this.citiesSvg.forEach((city) => {
      this.regionViewGroup.get(this.prefToRegion(city.prefecture)).push({region: this.prefToRegion(city.prefecture), name: city.title, capital: city.capital})
    })
  }

  public swapLegendView(number) {
    this.view = number;
    this.cdr.detectChanges();
  }
  public setActive(name: string) {
    this.ms.setActive(name, Mode.CIT)
  }

  public prefToRegion(name: string) {
    let pref = this.prefecturesData.find((prefecture) => {
      return prefecture.name == name;      
    })
    return pref.region
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
