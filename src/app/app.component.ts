import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnDestroy {
constructor(private router: Router) {}

  ngOnInit() {
    // this.subscription = timer(0, 2000).pipe(
    //   switchMap(() => this.httpClient.get(this.pUrl))
    // ).subscribe((response) => {
    //   this.pewdiepie = response;
    //   this.pImageUrl = this.pewdiepie.items[0].snippet.thumbnails.medium.url;
    //   this.pTitle = this.pewdiepie.items[0].snippet.title;
    //   this.pSubCount = this.pewdiepie.items[0].statistics.subscriberCount;
    //   this.pBannerImageUrl = this.pewdiepie.items[0].brandingSettings.image.bannerImageUrl;
    // });
  }

  onLoadCompare() {
    this.router.navigate(['/compare']);
  }

  onLoadPvT() {
    this.router.navigate(['/pewdiepie-vs-tseries']);
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
