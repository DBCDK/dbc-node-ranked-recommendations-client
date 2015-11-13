'use strict';

import request from 'request';
import {curry} from 'lodash';

/**
 * Method for getting recommendations
 *
 * @param {Object} params
 * @returns {Promise}
 */
function getPersonalRecommendations(endpoint, filters, params) {
  var parameters = JSON.stringify({like: params.like, filter: filters, maxresults: 100});

  return new Promise((resolve, reject) => {
    request.post({
      url: endpoint,
      body: parameters
    }, (err, response) => {
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
export default function Recommendations(endpoint, filters) {
  console.error(filters);
  return {
    getPersonalRecommendations: curry(getPersonalRecommendations)(endpoint)(filters)
  };
}
