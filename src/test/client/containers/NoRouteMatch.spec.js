import casual from 'casual';
import { expect } from 'chai';

import * as NoRouteMatch from '../../../client/containers/NoRouteMatch';

describe('Client View: Container > NoRouteMatch', () => {
  describe('.mapStateToProps', () => {
    it('should map state to props correctly', () => {
      expect(NoRouteMatch.mapStateToProps({})).to.deep.equal({});
    });
  });

  // Note: Could add a test to verify no typos in importing of action creators, but
  // this seems like a waste of time and just a repeat of the implementation
});
