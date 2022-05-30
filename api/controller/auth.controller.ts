/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import validate from '../validator';
import Requests from '../requests';
import BaseController from './base.controller';
import Auth from '../../models/authModel';

const client = new Requests();
class AuthUserController extends BaseController {
  async auth(data: Auth, schema: any) {
    const response = await client.url(`${(this.url)}/auth`).headers(this.params.token).method('POST').body(data)
      .send('Auth user');
    validate(schema, response.data);
    return response;
  }
}

export default AuthUserController;
