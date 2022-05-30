/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import CONFIG from '../../env';
import UserInfo from '../../models/userInfoModel';
import Requests from '../requests';
import validate from '../validator';
import BaseController from './base.controller';

const client = new Requests();
class UserInfoController extends BaseController {
  async addUserInfo(userId: number, data: UserInfo, schema: any) {
    const response = await client.url(`${(CONFIG.BASE_URL)}/user_info/${userId}`).headers(this.params.token).method('POST').body(data)
      .send('Add user information');
    validate(schema, response.data);
    return response;
  }

  async getUserInfo(userId: number, schema: any) {
    const response = await client.url(`${(CONFIG.BASE_URL)}/user_info/${userId}`).headers(this.params.token).method('GET')
      .send('Get user information');
    validate(schema, response.data);
    return response;
  }

  async deleteUserInfo(userId: number, schema: any) {
    const response = await client.url(`${(CONFIG.BASE_URL)}/user_info/${userId}`).headers(this.params.token).method('DELETE')
      .send('Delete user information');
    validate(schema, response.data);
    return response;
  }

  async editUserInfo(userId: number, data: UserInfo, schema: any) {
    const response = await client.url(`${(CONFIG.BASE_URL)}/user_info/${userId}`).headers(this.params.token).method('PUT').body(data)
      .send('Edit user information');
    validate(schema, response.data);
    return response;
  }
}

export default UserInfoController;
