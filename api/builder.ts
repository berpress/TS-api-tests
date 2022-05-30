/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Auth from '../models/authModel';
import ADD_REGISTRATION_SCHEMA from '../schemas/registration';

class Builder {
  client: any;

  user: any;

  userId: number;

  token: string;

  userInfo: any;

  store: { name: any; uuid: any; };

  item: { name: any; price: any; itemId: any; };

  balance: { balance: any; };

  constructor(client) {
    this.client = client;
  }

  async register() {
    const data = new Auth().random();
    const res = await this.client.register.register(data, ADD_REGISTRATION_SCHEMA);
    this.user = data;
    this.userId = res.data.uuid;
    return this;
  }

  async auth() {
    const response = await this.client.auth.auth(this.user, ADD_REGISTRATION_SCHEMA);
    this.token = response.data.access_token;
    return this;
  }

  build() {
    return new Builder(this);
  }
}
export default Builder;
