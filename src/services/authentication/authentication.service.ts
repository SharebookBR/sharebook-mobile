import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {config} from "../../../environments/environment";
import {SessionService} from "../session/session.service";

@Injectable()
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
  ) {

  }

  login(email: string, password: string) {
    return this.http.post<any>(`${config.apiEndpoint}/Account/Login/`, {email: email, password: password})
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
