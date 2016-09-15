import casual from 'casual';
import { expect } from 'chai';
import reducer from '../../../client/reducers/router';

import {
  ROUTE,
} from '../../../client/constants/ActionTypes';

describe('Client View: Reducer > Routes', () => {
  let initialState;

  beforeEach(() => {
    initialState = {};
  });

  it('returns the initial state', () => {
    initialState = undefined;

    const expectedState = {
      title: '',
    };

    expect(reducer(initialState, {})).to.deep.equal(expectedState);
  });

  describe('ROUTE', () => {
    it('handles request to route with title - ROUTE', () => {
      const title = casual.title;
      const action = {
        type: ROUTE,
        title,
      };

      const expectedState = {
        title,
      };

      expect(reducer(initialState, action)).to.deep.equal(expectedState);
    });

    it('handles request to route with no title - ROUTE', () => {
      initialState = undefined;
      const action = {
        type: ROUTE,
      };

      const expectedState = {
        title: '',
      };

      expect(reducer(initialState, action)).to.deep.equal(expectedState);
    });

    it('handles change of route', () => {
      initialState = undefined;
      let title = casual.title;
      const action1 = {
        type: ROUTE,
        title,
      };

      const state1 = {
        title,
      };

      // Confirm 1st route correct
      expect(reducer(initialState, action1)).to.deep.equal(state1);

      title = casual.title;
      const action2 = {
        type: ROUTE,
        title,
      };

      const state2 = {
        title,
      };

      // Confirm route changed correctly
      expect(reducer(state1, action2)).to.deep.equal(state2);
    });
  });
});
