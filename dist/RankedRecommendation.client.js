'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = Recommendations;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _lodash = require('lodash');

/**
 * Method for getting recommendations
 *
 * @param {Object} params
 * @returns {Promise}
 */
function getPersonalRecommendations(config, params) {
  var parameters = JSON.stringify({ profile: config.profile, like: params.like, filters: params.filter || [], maxresults: 100 });

  return new Promise(function (resolve, reject) {
    _request2['default'].post({
      url: config.endpoint,
      body: parameters
    }, function (err, response) {
      if (err) {
        return reject(err);
      }
      if (response.statusCode !== 200) {
        return reject(response);
      }
      return resolve(JSON.parse(response.body));
    });
  });
}

/**
 * Initialises the client and returns the request methods
 *
 * @param endpoint
 * @param config
 * @returns {{getSuggestions}}
 * @constructor
 */

function Recommendations(config) {
  if (!config) {
    throw new Error('config is undefined');
  }
  if (!config.endpoint) {
    throw new Error('An endpoint needs to be provided with config');
  }

  return {
    getPersonalRecommendations: (0, _lodash.curry)(getPersonalRecommendations)(config)
  };
}

module.exports = exports['default'];