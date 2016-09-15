import casual from 'casual';
import { expect } from 'chai';

import * as AppBar from '../../../client/containers/AppBar';

describe('Client View: Container > AppBar', () => {
  describe('.mapStateToProps', () => {
    it('should map state to props correctly', () => {
      const title = casual.title;
      const state = {
        router: {
          title,
        },
      };

      const expectedProps = {
        title,
      };

      expect(AppBar.mapStateToProps(state)).to.deep.equal(expectedProps);
    });
  });

  // Note: Could add a test to verify no typos in importing of action creators, but
  // this seems like a waste of time and just a repeat of the implementation
});
