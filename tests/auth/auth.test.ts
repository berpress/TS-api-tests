/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import ApiClient from '../../api/client';
import Auth from '../../models/authModel';
import { AUTH_USER_ERROR_SCHEMA, AUTH_USER_SCHEMA } from '../../schemas/auth';
import ADD_REGISTRATION_SCHEMA from '../../schemas/registration';

describe('Auth', () => {
  it('user with valid data', async () => {
    const client = new ApiClient();
    const data = new Auth().random();
    const response = await client.register.register(data, ADD_REGISTRATION_SCHEMA);
    expect(response.status).toBe(201);
    expect(response.data.message).toBe('User created successfully.');
    const responseAuth = await client.auth.auth(data, AUTH_USER_SCHEMA);
    expect(responseAuth.status).toBe(200);
  });

  it('none created user', async () => {
    const client = new ApiClient();
    const data = new Auth().random();
    const responseAuth = await client.auth.auth(data, AUTH_USER_ERROR_SCHEMA);
    expect(responseAuth.status).toBe(401);
  });
});
