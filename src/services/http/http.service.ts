import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {
  version: string;
  options: Options;

  constructor(
    public httpClient: HttpClient,
    public appVersion: AppVersion,
  ) {
    this.getAppVersion();
  }

  getAppVersion() {
    this.appVersion.getVersionNumber().then(version => {
      this.version = `v${version}`;
    }, err => {
      // Minimum acceptable version
      this.version = 'v2.0.0'
    })
  }

  getOptions(options) {
    return {
      ...options,
      headers: {
        'X-Requested-With': 'com.makeztec.sharebook',
        'Client-Version': this.version,
      },
    }
  }

  post(url, body, options = {}): Observable<any> {
    return this.httpClient.post(url, body, this.getOptions(options));
  }
}

interface Options {
  headers: HttpHeaders,
  params: HttpParams,
}
