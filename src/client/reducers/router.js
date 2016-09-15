import { ROUTE } from '../constants/ActionTypes';

const router = (state = { title: '' }, action) => {
  switch (action.type) {
    case ROUTE:
      if (action.title) {
        return Object.assign({}, state, { title: action.title });
      }
      return state;
    default: {
      return state;
    }
  }
};

export default router;
