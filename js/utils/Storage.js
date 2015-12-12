/**
 * @flow
 */
import {AsyncStorage} from 'react-native';

/**
 * Wrapper around AsyncStorage.
 */
export default class Storage {
  static async getItem(key: string, defaultValue: any): Promise {
    const itemStr = await AsyncStorage.getItem(key);
    if (!itemStr) {
      return defaultValue;
    }
    const item = JSON.parse(itemStr);
    return item.data;
  }

  static setItem(key: string, item: any): Promise {
    const itemStr = JSON.stringify({
      data: item,
    });
    return AsyncStorage.setItem(key, itemStr);
  }

  static removeItem(key: string): Promise {
    return AsyncStorage.removeItem(key);
  }

  static clear(): Promise {
    return AsyncStorage.clear();
  }
}
