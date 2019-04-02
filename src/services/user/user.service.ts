import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../../models/user';
import {ChangePasswordUserVM} from '../../models/ChangePasswordUserVM';
import {Profile} from '../../models/profile';
import {config} from "../../../environments/environment";
import {Storage} from "@ionic/storage";
import {SessionService} from "../session/session.service";
import {OneSignalService} from "../one-signal/one-signal";

@Injectable()
export class UserService {

  constructor(
    private _http: HttpClient,
    private sessionService: SessionService,
    private oneSingalService: OneSignalService,
    @Inject(Storage) public storage: Storage
  ) {

  }

  getAll() {
    return this._http.get<User[]>(`${config.apiEndpoint}/users`);
  }

  getUserData() {
    return this._http.get<User>(`${config.apiEndpoint}/Account`);
  }

  register(user: User) {
    return this._http.post<any>(`${config.apiEndpoint}/Account/Register`, user)
      .pipe(map(response => {
        if (response.authenticated) {
          this.sessionService.setSession({
            user: response,
            accessToken: response.accessToken
          });

          const {name, userId: id, email} = response;
          this.oneSingalService.sendOneSignalTags({name, id, email});
        }
        return response;
      }));
  }

  update(updateUserVM: User) {
    return this._http.put<User>(`${config.apiEndpoint}/Account`, updateUserVM);
  }

  changePassword(changePasswordUserVM: ChangePasswordUserVM) {
    return this._http.put<any>(`${config.apiEndpoint}/Account/ChangePassword/`, changePasswordUserVM);
  }

  delete(id: number) {
    // return this._http.delete(`${config.apiEndpoint}/users/` + id);
  }

  getProfile() {
    return this._http.get<Profile>(`${config.apiEndpoint}/account/profile`);
  }

  consultarCEP(cep) {
    return this._http.get("http://viacep.com.br/ws/" + cep + "/json/")
  }

  forgotPassword(email) {
    return this._http.post(`${config.apiEndpoint}/Account/ForgotMyPassword/`, {email});
  }
}
