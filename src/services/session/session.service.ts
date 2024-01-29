import {Inject, Injectable} from '@angular/core';
import {User} from "../../models/user";
import {Storage} from "@ionic/storage";
import {Session} from "../../models/session";

@Injectable()
export class SessionService {
  private _data: Session = {};

  constructor(
    @Inject(Storage) public storage: Storage,
  ) {

  }

  get data(): Session {
    return this._data;
  }

  get user(): User {
    return this._data.user;
  }

  setSession(data: Session) {
    this._data = {...this.data, ...data};
    this.storage.set('lastEmail', data.user.email);
    this.storage.set('session', JSON.stringify(data));
  }

  async restoreSession() {
    const data = await this.storage.get('session');
    if (data) this._data = JSON.parse(data);
  }

  clearSession() {
    this._data = {};
    this.storage.remove('session');
  }
}
