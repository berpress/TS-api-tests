/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import validate from '../validator';
import Requests from '../requests';
import BaseController from './base.controller';
import Auth from '../../models/authModel';

const client = new Requests();
class RegisterUserController extends BaseController {
  async register(data: Auth, schema: any) {
    const response = await client.url(`${(this.url)}/register`).headers(this.params.token).method('POST').body(data)
      .send('Register new user');
    validate(schema, response.data);
    return response;
  }
}

export default RegisterUserController;
