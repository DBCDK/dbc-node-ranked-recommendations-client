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
export default function Recommendations(config) {
  if (!config) {
    throw new Error('config is undefined');
  }
  if (!config.endpoint) {
    throw new Error('An endpoint needs to be provided with config');
  }

  const filters = config.filters || null;


  return {
    getPersonalRecommendations: curry(getPersonalRecommendations)(config.endpoint)(filters)
  };
}
