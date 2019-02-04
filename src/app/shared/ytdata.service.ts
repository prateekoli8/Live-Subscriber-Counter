import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, timer, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class YTService {
  constructor(private httpClient: HttpClient) {}
  api_key = 'AIzaSyBDh48Lhz1aeNxANEQr5gUTC1hriCHf5Oc';
  api_base_url = 'https://www.googleapis.com/youtube/v3/';
  getUserData(username) {
    const apiUrl = this.api_base_url +
    'channels?forUsername=' + username +
    '&key=' + this.api_key + '&part=snippet,statistics,brandingSettings';
    return this.httpClient.get(apiUrl);
  }

  getUserStats(username) {
    const updateSubsUrl = this.api_base_url +
    'channels?forUsername=' + username +
    '&key=' + this.api_key + '&part=statistics';
    return timer(0, 2000).pipe(
      switchMap(() => this.httpClient.get(updateSubsUrl))
    );
  }
}
