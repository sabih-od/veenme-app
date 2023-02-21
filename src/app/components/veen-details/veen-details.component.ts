import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/pages/base-page/base-page';

@Component({
  selector: 'app-veen-details',
  templateUrl: './veen-details.component.html',
  styleUrls: ['./veen-details.component.scss'],
})
export class VeenDetailsComponent extends BasePage implements OnInit {
  _item;
  @Input() set item(val) {
    console.log('VEEN ITEM is', val);

    this._item = val;
  }

  get item() {
    return this._item;
  }
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {}

  closeModal() {
    this.modals.dismiss();
  }
}
