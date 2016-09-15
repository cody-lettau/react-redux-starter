import casual from 'casual';
import { expect } from 'chai';

import route from '../../../client/actions/route';

describe('Admin - View: Action > Route', () => {
  // route Action tests
  describe('.route', () => {
    it('routes with title and tab', () => {
      const title = casual.title;
      const tabRoute = casual.word;
      const expectedAction = {
        type: 'ROUTE',
        title,
        tabRoute,
      };

      const response = route(title, tabRoute);

      expect(response).to.have.all.keys('type', 'title', 'tabRoute');
      expect(response.type).to.equal(expectedAction.type);
      expect(response.title).to.equal(expectedAction.title);
      expect(response.tabRoute).to.equal(expectedAction.tabRoute);
    });

    it('routes with only title', () => {
      const title = casual.title;
      const expectedAction = {
        type: 'ROUTE',
        tabRoute: undefined,
        title,
      };

      const response = route(title);

      expect(response).to.have.all.keys('type', 'title', 'tabRoute');
      expect(response.type).to.equal(expectedAction.type);
      expect(response.title).to.equal(expectedAction.title);
      expect(response.tabRoute).to.equal(expectedAction.tabRoute);
    });
  });
});
