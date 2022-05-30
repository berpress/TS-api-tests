/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import RequestModel from './commonModels';

class Auth implements RequestModel {
  readonly username: string;

  readonly password: string;

  constructor(username?: string, password?: string) {
    this.username = username;
    this.password = password;
  }

  random() {
    const login = (this.username === undefined) ? faker.internet.email() : this.username;
    const password = (this.password === undefined) ? faker.internet.password() : this.password;
    return new Auth(login, password);
  }
}

export default Auth;
