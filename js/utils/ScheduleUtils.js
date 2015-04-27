'use strict';

var ApiUtils = require('./ApiUtils');

module.exports = {
  getSchedule() {
    //TODO: local cache
    return ApiUtils.getSchedule();
  },
};
