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
function getPersonalRecommendations(endpoint, params) {
  var parameters = JSON.stringify({ like: params.like, maxresults: 100, filter: ['phrase.type:bog'] });

  return new Promise(function (resolve, reject) {
    _request2['default'].post({
      url: endpoint,
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

function Recommendations(endpoint) {
  return {
    getPersonalRecommendations: (0, _lodash.curry)(getPersonalRecommendations)(endpoint)
  };
}

module.exports = exports['default'];