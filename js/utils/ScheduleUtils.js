/**
 * @flow
 */

import ApiUtils from './ApiUtils';

export function getSchedule(): Promise {
  // TODO: local cache
  return ApiUtils.getSchedule();
}
