import {Inject, Injectable} from '@angular/core';
import {User} from "../../models/user";
import {Storage} from "@ionic/storage";
import {Session} from "../../models/session";

@Injectable()
export class SessionService {
  private data: Session = {};

  constructor(
    @Inject(Storage) public storage: Storage
  ) {

  }

  get user(): User {
    return this.data.user;
  }

  setSession(data: Session) {
    this.data = {...this.data, ...data};
    this.storage.set('session', JSON.stringify(data));
  }

  async restoreSession() {
    const data = await this.storage.get('session');
    if (data) this.data = JSON.parse(data);
  }

  clearSession() {
    this.data = {};
    this.storage.remove('session');
  }
}
