import * as types from '../constants/ActionTypes';

export default function route(title, tabRoute) {
  return {
    type: types.ROUTE,
    title,
    tabRoute,
  };
}
