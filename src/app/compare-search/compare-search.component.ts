import { Component, OnInit, OnDestroy } from '@angular/core';
import {YTService} from '../shared/ytdata.service';
import { Subscription, timer, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-compare-search',
  templateUrl: './compare-search.component.html',
  styleUrls: ['./compare-search.component.css']
})
export class CompareSearchComponent implements OnInit, OnDestroy {
  constructor(private ytservice: YTService) {}
  subscription: Subscription;
  secondSubscription: Subscription;
  title = 'live-sub-counter';
  firstForUsername = null;
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
  secondForUsername = null;
  secondTitle = null;
  secondSubCount: number = null;
  secondBannerImageUrl = null;
  subGap: number = null;

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    console.log('Destroyed');
    }
    if (this.secondSubscription != null) {
      this.secondSubscription.unsubscribe();
    console.log('Destroyed');
    }
    const lowerFirstUsername = form.value.firstUsername.toLowerCase();
    const lowerSecondUsername = form.value.secondUsername.toLowerCase();
    this.ytservice.getUserData(lowerFirstUsername).subscribe(
      (response) => {
        this.response = response;
        this.firstBannerImageUrl = this.response.items[0].brandingSettings.image.bannerImageUrl;
        this.firstImageUrl = this.response.items[0].snippet.thumbnails.default.url;
        this.firstTitle = this.response.items[0].snippet.title;
      }
    );
    this.ytservice.getUserData(lowerSecondUsername).subscribe(
      (response) => {
        this.secondResponse = response;
        this.secondBannerImageUrl = this.secondResponse.items[0].brandingSettings.image.bannerImageUrl;
        this.secondImageUrl = this.secondResponse.items[0].snippet.thumbnails.default.url;
        this.secondTitle = this.secondResponse.items[0].snippet.title;
      }
    );
    this.subscription = this.ytservice.getUserStats(lowerFirstUsername).
    subscribe((response) => {
      this.subResponse = response;
      this.firstSubCount = this.subResponse.items[0].statistics.subscriberCount;
      if ((this.firstSubCount != null && this.secondSubCount != null) && (this.firstSubCount > this.secondSubCount)) {
        this.subGap = this.firstSubCount - this.secondSubCount;
       } else {
         this.subGap = this.secondSubCount - this.firstSubCount;
       }
    } );
    this.secondSubscription = this.ytservice.getUserStats(lowerSecondUsername).
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
