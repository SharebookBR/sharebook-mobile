import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {config} from "../../../environments/environment";
import {SessionService} from "../session/session.service";
import {HttpService} from '../http/http.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private http: HttpService,
    private sessionService: SessionService,
  ) {

  }

  login(email: string, password: string) {
    return this.http.post(`${config.apiEndpoint}/Account/Login/`, {email: email, password: password})
      .pipe(map(response => {
        const {success, value} = response;

        if (success || value.authenticated) {
          this.sessionService.setSession({
            user: value,
            accessToken: value.accessToken,
            expiration: value.expiration,
          });
        }

        return response.value;
      }));
  }

  logout() {
    this.sessionService.clearSession();
  }
}
