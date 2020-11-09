import Api from './ApiBase';

export default class ApiRepository {
  get(url) {
    return Api.get(url);
  }
  post(url, data) {
    return Api.post(url, data);
  }
  put(url, data) {
    return Api.put(url, data);
  }
}
