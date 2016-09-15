import _ from 'lodash';

function getFilename(path) {
  const name = path.replace(/^.*[\\\/]/, '');
  return name.split('.')[0];
}

function buildLocaleMap(files) {
  const map = {};

  _.forEach(files, item => {
    const key = getFilename(item);
    map[key] = require(item); // eslint-disable-line global-require
  });

  return map;
}

export default {
  buildLocaleMap,
};
