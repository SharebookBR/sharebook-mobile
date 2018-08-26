import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../../models/user';
import {UpdateUserVM} from '../../models/updateUserVM';
import {ChangePasswordUserVM} from '../../models/ChangePasswordUserVM';
import {Profile} from '../../models/profile';
import {config} from "../../../environments/environment";
import {Storage} from "@ionic/storage";
import {SessionService} from "../session/session.service";

@Injectable()
export class UserService {

  constructor(
    private _http: HttpClient,
    private sessionService: SessionService,
    @Inject(Storage) public storage: Storage
  ) {

  }

  getAll() {
    return this._http.get<User[]>(`${config.apiEndpoint}/users`);
  }

  getUserData() {
    return this._http.get<UpdateUserVM>(`${config.apiEndpoint}/Account`);
  }

  register(user: User) {
    return this._http.post<any>(`${config.apiEndpoint}/Account/Register`, user)
      .pipe(map(response => {
        // login successful if there's a jwt token in the response
        if (response.success || response.authenticated) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.sessionService.setSession({user: response})
        }
        return response;
      }));
  }

  update(updateUserVM: UpdateUserVM) {
    return this._http.put<any>(`${config.apiEndpoint}/Account`, updateUserVM);
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
}
