import { Injector } from '@angular/core';
import { Location } from '@angular/common';
import { Platform, MenuController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalService } from 'src/app/services/basic/modal.service';
import { NavService } from 'src/app/services/basic/nav.service';
import { UtilityService } from 'src/app/services/utility.service';
import { EventsService } from 'src/app/services/basic/events.service';
import { NetworkService } from 'src/app/services/network.service';
import { StorageService } from 'src/app/services/basic/storage.service';
import { UserService } from 'src/app/services/user.service';
import { ImageService } from 'src/app/services/basic/image.service';
import { AlertsService } from 'src/app/services/basic/alerts.service';
import { DataService } from 'src/app/services/data.service';

export abstract class BasePage {
  public platform: Platform;
  public formBuilder: FormBuilder;
  public menuCtrl: MenuController;
  public domSanitizer: DomSanitizer;
  public modals: ModalService;
  public nav: NavService;
  public utility: UtilityService;
  public events: EventsService;
  public network: NetworkService;
  public storage: StorageService;
  public user: UserService;
  public image: ImageService;
  public alert: AlertsService;
  public data: DataService;

  constructor(injector: Injector) {
    this.platform = injector.get(Platform);
    this.formBuilder = injector.get(FormBuilder);
    this.menuCtrl = injector.get(MenuController);
    this.domSanitizer = injector.get(DomSanitizer);
    this.nav = injector.get(NavService);
    this.modals = injector.get(ModalService);
    this.utility = injector.get(UtilityService);
    this.events = injector.get(EventsService);
    this.network = injector.get(NetworkService);
    this.user = injector.get(UserService);
    this.storage = injector.get(StorageService);
    this.image = injector.get(ImageService);
    this.alert = injector.get(AlertsService);
    this.data = injector.get(DataService);
  }
}
