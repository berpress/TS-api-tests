/* eslint-disable lines-between-class-members */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-unresolved
import CONFIG from '../env';
import Auth from '../models/authModel';
import { AUTH_USER_SCHEMA } from '../schemas/auth';
import ADD_REGISTRATION_SCHEMA from '../schemas/registration';
import AuthUserController from './controller/auth.controller';
import RegisterUserController from './controller/register.controller';
import UserInfoController from './controller/userInfo.controller';

class ApiClient {
  readonly url: string;
  readonly params: any;

  register: RegisterUserController;
  auth: AuthUserController;
  userInfo: UserInfoController;

  constructor(params = { token: null }) {
    this.url = CONFIG.BASE_URL;
    this.params = params;
    this.register = new RegisterUserController(this.url, this.params);
    this.auth = new AuthUserController(this.url, this.params);
    this.userInfo = new UserInfoController(this.url, this.params);
  }

  static unauthorized() {
    return new ApiClient();
  }

  static async authorized() {
    const client = ApiClient.unauthorized();
    const data = new Auth().random();
    const responseRegister = await client.register.register(data, ADD_REGISTRATION_SCHEMA);
    const responseAuth = await client.auth.auth(data, AUTH_USER_SCHEMA);
    const token = responseAuth.data.access_token;
    return { userId: responseRegister.data.uuid, client: new ApiClient({ token }) };
  }
}

export default ApiClient;
