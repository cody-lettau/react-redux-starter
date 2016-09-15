import * as _ from 'lodash';

function checkResponseStatus(response) {
  if (Array.isArray(response)) {
    return response.map(res => checkResponseStatus(res));
  }
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function checkStatus(response) {
  if (Array.isArray(response)) {
    return response.map(res => checkResponseStatus(res));
  }
  return checkResponseStatus(response);
}

export function inDebugMode() {
  return location.search.indexOf('debug=true') > -1;
}

export function host() {
  return location.origin;
}

export function parseAllSettledResponse(response) {
  const fulfilledData = _.filter(response, (item) => item.state === 'fulfilled' && !!item.value);
  return _.map(fulfilledData, 'value');
}

export function allPromisesSettled(promises) {
  return Promise.all(promises.map((promise) => promise.then(
    (val) => ({ state: 'fulfilled', value: val }),
    (err) => ({ state: 'rejected', reason: err })
  )));
}
