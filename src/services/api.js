class Api {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL;
    this.appid = process.env.REACT_APP_API_KEY;
  }

  get(url, data) {
    return fetch(this.getUrl(url, data)).then((res) => res.json());
  }

  getUrl(path, params) {
    const url = new URL(`${this.baseUrl}${path}`);
    params = {...params, appid: this.appid};
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
    return url;
  }
}

export default new Api();
