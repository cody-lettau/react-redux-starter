import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import AppTheme from '../../../../client/resources/theme';

import LoadingIndicator from '../../../../client/components/ui-components/LoadingIndicator';

describe('Client View: Component > LoadingIndicator', () => {
  const shallowWithContext = (node) => shallow(node, { context: { AppTheme } });

  it('renders LoadingIndicator component', () => {
    const wrapper = shallowWithContext(<LoadingIndicator />);

    expect(wrapper).to.exist();
  });
});
