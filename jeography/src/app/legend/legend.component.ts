import { Component, OnInit } from '@angular/core';
import { prefectures, prefecturesData } from '../data';
import { MapService } from '../map/map.service';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {
  public prefectures = prefectures;
  public prefecturesData = prefecturesData;

  constructor(public mapService: MapService) {
  
  }

  ngOnInit(): void {

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
}
