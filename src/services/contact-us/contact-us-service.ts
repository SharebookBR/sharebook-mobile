import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from "../../../environments/environment";

@Injectable()
export class ContactUsService {

  constructor(
    private http: HttpClient,
  ) {

  }

  public contactUs(data) {
    return this.http.post<any>(`${config.apiEndpoint}/ContactUs/SendMessage`, data);
  }
}

