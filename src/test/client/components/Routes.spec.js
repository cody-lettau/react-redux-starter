import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import AppTheme from '../../../client/resources/theme';

import Routes from '../../../client/components/Routes';

describe('Client View: Component > Routes', () => {
  const shallowWithContext = (node) => shallow(node, { context: { AppTheme } });
  const props = {};

  describe('#render', () => {
    it('renders component', () => {
      props.error = null;
      const wrapper = shallowWithContext(<Routes {...props} />);

      expect(wrapper).to.exist();
    });
  });
});
