import ApiUtils from './ApiUtils';

module.exports = {
  getSchedule() {
    // TODO: local cache
    return ApiUtils.getSchedule();
  },
};
