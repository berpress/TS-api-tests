// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import pino from 'pino';
// eslint-disable-next-line import/no-extraneous-dependencies
// import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

interface Options {
    readonly url?: string,
    readonly method?: string,
    readonly data?: any,
    headers?: any,
    params?: any,
}

class Requests {
  options: Options = {};

  constructor() {
    this.options = {};
  }

  url(url: string) {
    this.options = { ...this.options, url };
    return this;
  }

  method(method: string) {
    this.options = { ...this.options, method };
    return this;
  }

  body(data: any) {
    const { ...object } = data;
    this.options = { ...this.options, data: object };
    return this;
  }

  params(params) {
    this.options = { ...this.options, params };
    return this;
  }

  headers(token: string) {
    const headers = (token === null) ? null : { Authorization: `JWT ${token}` };
    this.options = { ...this.options, headers };
    return this;
  }

  async send(nameRequest: string) {
    logger.info(`${nameRequest} request: method is ${this.options.method}, url is ${this.options.url}, body is ${JSON.stringify(this.options.data, null, 4)}`);
    try {
      const response = await axios({
        ...this.options,
      });
      logger.info(`${nameRequest} response: status is ${response.status}, body is ${JSON.stringify(response.data, null, 4)}`);
      return response;
    } catch (e) {
      logger.info(`${nameRequest} response: status is ${e.response.status},  body is ${JSON.stringify(e.response.data, null, 4)}`);
      return e.response;
    }
  }
}

export default Requests;
