import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/pages/base-page/base-page';

@Component({
  selector: 'app-people-are-veening',
  templateUrl: './people-are-veening.component.html',
  styleUrls: ['./people-are-veening.component.scss'],
})
export class PeopleAreVeeningComponent extends BasePage implements OnInit {
  people_are_veening: any;
  isLoading = true;

  constructor(injector: Injector) {
    super(injector);
  }

  async ngOnInit() {
    await this.getData();
  }

  async getData() {
    const people_are_veening = await this.network.getPeopleVeening();
    console.log('Log', people_are_veening);
    this.people_are_veening = people_are_veening.data;
    this.isLoading = false;
  }

  close() {
    this.modals.dismiss();
  }
}
