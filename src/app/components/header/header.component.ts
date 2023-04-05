import { Component, Input, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title = '';
  @Input() back = false;
  menu: any;

  constructor(public nav: NavService) {}

  ngOnInit() {}
  goTo(route) {
    this.nav.setRoot(route);
    this.menu.close();
  }
}
