class BaseController {
  params: {token: string};

  readonly url: string;

  constructor(url: string, params: {token: string}) {
    this.params = params;
    this.url = url;
  }
}

export default BaseController;
