import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'explore-item',
  templateUrl: './explore-item.component.html',
  styleUrls: ['./explore-item.component.scss'],
})
export class ExploreItemComponent implements OnInit {

  @Input('item') item: any;

  constructor() { }

  ngOnInit() { }

}
