import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import RaisedButton from 'material-ui/RaisedButton';
import AppTheme from '../../../../client/resources/theme';

import LogoutLink from '../../../../client/components/ui-components/LogoutLink';

describe('Client View: Component > LogoutLink', () => {
  const shallowWithContext = (node) => shallow(node, { context: { AppTheme } });
  let props;

  beforeEach(() => {
    props = {
      onClick: sinon.spy(),
    };
  });

  afterEach(() => {
    props.onClick.reset();
  });

  it('renders LogoutLink component', () => {
    const wrapper = shallowWithContext(<LogoutLink {...props} />);

    expect(wrapper).to.exist();
    expect(wrapper.props().label).to.equal('Log Out');
  });

  it('handles click of button', () => {
    const wrapper = mount(
      <LogoutLink {...props} />
    );

    expect(wrapper.find('RaisedButton').length).to.equal(1);

    const node = ReactDOM.findDOMNode(
      ReactTestUtils.findRenderedComponentWithType(
        wrapper.instance(), RaisedButton
      )
    );

    ReactTestUtils.Simulate.touchTap(node);
    expect(props.onClick).to.have.been.called();
  });
});
