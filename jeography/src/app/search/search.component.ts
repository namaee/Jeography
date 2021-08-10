import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(public ss: SearchService) { }

  ngOnInit(): void {
  }

}
