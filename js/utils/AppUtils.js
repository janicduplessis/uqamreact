import Storage from './Storage';

const KEY_APP_STORE = 'app_store';

export default class AppUtils {
  static loadAppData() {
    return Storage.getItem(KEY_APP_STORE);
  }

  static saveAppData(data) {
    return Storage.setItem(KEY_APP_STORE, data);
  }
}
