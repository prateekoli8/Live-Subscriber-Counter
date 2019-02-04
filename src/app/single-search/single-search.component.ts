import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { YTService } from '../shared/ytdata.service';

@Component({
  selector: 'app-single-search',
  templateUrl: './single-search.component.html',
  styleUrls: ['./single-search.component.css']
})
export class SingleSearchComponent implements OnInit, OnDestroy {
  @ViewChild('f') ytForm: NgForm;
  subscription: Subscription;
  updateSubscription: Subscription;
  pageTitle = null;
  imageUrl = null;
  title = null;
  subCount: number = null;
  bannerImageUrl = null;
  response = null;
  subResponse = null;
  constructor(private ytservice: YTService) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    console.log('Destroyed');
    }
    const lowerUsername = form.value.username.toLowerCase();
    this.subscription = this.ytservice.getUserData(lowerUsername).subscribe((response) => {
      this.response = response;
      this.title = this.response.items[0].snippet.title;
      this.pageTitle = this.title + ' Live Subscriber Count';
      this.bannerImageUrl = this.response.items[0].brandingSettings.image.bannerImageUrl;
      this.imageUrl = this.response.items[0].snippet.thumbnails.medium.url;
      this.subCount = this.response.items[0].statistics.subscriberCount;
    });
    this.updateSubscription = this.ytservice.getUserStats(lowerUsername).
      subscribe((response) => {
        this.subResponse = response;
        this.subCount = this.subResponse.items[0].statistics.subscriberCount;
      } );
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    console.log('Destroyed');
    }
    // this.secondSubscription.unsubscribe();
  }
}
