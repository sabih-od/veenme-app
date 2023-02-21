import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  latestEvent = 'randomLast';
  historicalEvent = 'randomHistory';

  subscriptions;

  constructor() { 
    // pubsubSvc.registerEventWithHistory(this.historicalEvent, 6);
    // pubsubSvc.registerEventWithLastValue(this.latestEvent, undefined);
  }

  publish(key: string, data = {}){ 
    // this.pubsubSvc.publishEvent(key, data);
  }

  subscribe(key, handler ){
    // this.pubsubSvc.subscribe(key, data =>  handler(data) );
    // this.subscriptions[key] = 
  }

  unsubscribe(key){
    // this.pubsubSvc.subscribe(key)
    // this.subscriptions[key].unsubscribe();
  }
}
