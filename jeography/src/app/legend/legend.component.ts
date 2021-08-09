import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { citiesSvg, prefectures, prefecturesData, regionSvg } from '../data';
import { MapService } from '../map/map.service';
import { CType, Mode } from '../quiz/quiz';

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

  public prefView: number = 0;
  public view: number = 0;
  public prefectureViewGroup: Map<string, {region: string, name: string}[]> = new Map();
  public regionViewGroup: Map<string, {region: string, name: string, capital: boolean, type: CType}[]> = new Map();
  public regionView: {region: string, name: string, capital: boolean, type: CType}[] = []
  public cityTypeView: {cityType: string, name: string, capital: boolean, type: CType}[]

  constructor(public ms: MapService, public cdr: ChangeDetectorRef) {
  
  }

  ngOnInit(): void {
    this.citiesSvg.sort((a, b) => new Intl.Collator('jp').compare(a.title, b.title))
    this.prefectures.sort((a, b) => new Intl.Collator('jp').compare(a.name, b.name))
    this.regionSvg.sort((a, b) => new Intl.Collator('jp').compare(a.title, b.title))

    this.regionSvg.forEach((region) => {
      this.prefectureViewGroup.set(region.title, [])
      this.regionViewGroup.set(region.title, [])
    })
    this.prefecturesData.forEach((pref) => {
      this.prefectureViewGroup.get(pref.region).push({region: pref.region, name: pref.name})
    })
    this.citiesSvg.forEach((city) => {
      this.regionViewGroup.get(this.prefToRegion(city.prefecture)).push({region: this.prefToRegion(city.prefecture), name: city.title, capital: city.capital, type: city.type})
    })
  }

  public swapLegendView(number) {
    this.view = number;
    this.cdr.detectChanges();
  }
  public setActive(name: string) {
    this.ms.setActive(name)

  }

  public prefToRegion(name: string) {
    let pref = this.prefecturesData.find((prefecture) => {
      return prefecture.name == name;      
    })
    return pref.region
  }

  public rectType(type: CType) {
    switch (type) {
      case CType.DESIG: return "Designated City";
      case CType.CORE: return "Core City";
      case CType.SPEC: return "Special City";
      case CType.CITY: return "City";
      case CType.WARD: return "Special Wards";
    }
  }
  public getPopRank(pref: string) {
    const sorted = this.prefecturesData.slice().sort((a, b) => a.population < b.population ? 1 : -1)
    return sorted.findIndex((prefecture) => prefecture.name == pref) + 1
  }
  
  public getAreaRank(pref: string) {
    const sorted = this.prefecturesData.slice().sort((a, b) => a.area < b.area ? 1 : -1)
    return sorted.findIndex((prefecture) => prefecture.name == pref) + 1
  }

  public numberRankSuffix(rank: number) {
    let ranking = rank.toString().slice(-1)
    let numberRanking = parseInt(ranking);
    if (numberRanking == 1) {
      return "st"
    } else if (numberRanking == 2) {
      return "nd"
    } else if (numberRanking == 3) {
      return "rd"
    } else {
      return "th"
    }
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
