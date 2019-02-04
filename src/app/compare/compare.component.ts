import { Component, OnInit, OnDestroy } from '@angular/core';
import {YTService} from '../shared/ytdata.service';
import { Subscription, timer, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit, OnDestroy {
  constructor(private ytservice: YTService) {}
  subscription: Subscription;
  secondSubscription: Subscription;
  title = 'live-sub-counter';
  firstForUsername = 'pewdiepie';
  firstImageUrl = null;
  firstTitle = null;
  firstSubCount: number = null;
  firstBannerImageUrl = null;
  response = null;
  subResponse = null;
  secSubResponse = null;
  secondResponse = null;
  updateSubs = null;
  secondImageUrl = null;
  secondForUsername = 'tseries';
  secondTitle = null;
  secondSubCount: number = null;
  secondBannerImageUrl = null;
  subGap: number = null;

     ngOnInit() {
      if (this.subscription != null) {
        this.subscription.unsubscribe();
      console.log('Destroyed');
      }
      if (this.secondSubscription != null) {
        this.secondSubscription.unsubscribe();
      console.log('Destroyed');
      }
      this.ytservice.getUserData(this.firstForUsername).subscribe(
        (response) => {
          this.response = response;
          this.firstBannerImageUrl = this.response.items[0].brandingSettings.image.bannerImageUrl;
          this.firstImageUrl = this.response.items[0].snippet.thumbnails.default.url;
          this.firstTitle = this.response.items[0].snippet.title;
        }
      );
      this.ytservice.getUserData(this.secondForUsername).subscribe(
        (response) => {
          this.secondResponse = response;
          this.secondBannerImageUrl = this.secondResponse.items[0].brandingSettings.image.bannerImageUrl;
          this.secondImageUrl = this.secondResponse.items[0].snippet.thumbnails.default.url;
          this.secondTitle = this.secondResponse.items[0].snippet.title;
        }
      );
      this.subscription = this.ytservice.getUserStats(this.firstForUsername).
      subscribe((response) => {
        this.subResponse = response;
        this.firstSubCount = this.subResponse.items[0].statistics.subscriberCount;
      } );
      this.secondSubscription = this.ytservice.getUserStats(this.secondForUsername).
      subscribe((response) => {
        this.secSubResponse = response;
        this.secondSubCount = this.secSubResponse.items[0].statistics.subscriberCount;
        if ((this.firstSubCount != null && this.secondSubCount != null) && (this.firstSubCount > this.secondSubCount)) {
          this.subGap = this.firstSubCount - this.secondSubCount;
         } else {
           this.subGap = this.secondSubCount - this.firstSubCount;
         }
      } );
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    console.log('Destroyed');
    }
    if (this.secondSubscription != null) {
      this.secondSubscription.unsubscribe();
    console.log('Destroyed');
    }
    // this.secondSubscription.unsubscribe();
  }

}

