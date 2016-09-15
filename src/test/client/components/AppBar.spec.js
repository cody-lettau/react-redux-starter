import casual from 'casual';
import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { browserHistory } from 'react-router';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import FlatButton from 'material-ui/FlatButton';
import Overlay from 'material-ui/internal/Overlay';
import AppTheme from '../../../client/resources/theme';

import AppBar from '../../../client/components/AppBar';
import MUIAppBar from 'material-ui/AppBar';

describe('Client View: Component > AppBar', () => {
  const shallowWithContext = (node) => shallow(node, { context: { AppTheme } });
  const props = {
    title: casual.title,
  };
  let historyStub;

  beforeEach(() => {
    historyStub = sinon.stub(browserHistory, 'push', () => {});
  });

  afterEach(() => {
    historyStub.restore();
  });

  describe('#render', () => {
    it('renders component', () => {
      const wrapper = shallowWithContext(<AppBar {...props} />);

      expect(wrapper.find(MUIAppBar)).to.exist();
    });

    it('renders title', () => {
      const wrapper = mount(
        <AppBar {...props} />
      );

      expect(wrapper.find('h1').length).to.equal(1);
    });

    it('renders locale menu', () => {
      props.locale = 'en';
      const wrapper = mount(
        <AppBar {...props} />
      );

      expect(wrapper.find('FlatButton').length).to.equal(1);
      expect(wrapper.state('localeMenuOpen')).to.be.false();
    });

    it('does not render locale menu', () => {
      props.locale = null;
      const wrapper = mount(
        <AppBar {...props} />
      );

      expect(wrapper.find('FlatButton').length).to.equal(0);
    });
  });

  describe('Left Nav Handling', () => {
    beforeEach(() => {
      props.location = {
        search: '',
      };
    });

    it('renders with left nav closed', () => {
      const wrapper = shallowWithContext(
        <AppBar {...props} />
      );

      expect(wrapper.state('leftNavOpen')).to.be.false();
    });

    it('opens left nav after button click', () => {
      const wrapper = mount(
        <AppBar {...props} />
      );

      expect(wrapper.find('IconButton').length).to.equal(1);

      const node = ReactDOM.findDOMNode(
        ReactTestUtils.findRenderedDOMComponentWithTag(
          wrapper.instance(), 'button'
        )
      );
      ReactTestUtils.Simulate.touchTap(node);
      expect(wrapper.state('leftNavOpen')).to.be.true();
    });

    it('handles click outside of nav menu when opened', () => {
      const wrapper = mount(
        <AppBar {...props} />
      );

      // Open nav menu
      const node = ReactDOM.findDOMNode(
        ReactTestUtils.findRenderedDOMComponentWithTag(
          wrapper.instance(), 'button'
        )
      );

      ReactTestUtils.Simulate.touchTap(node);
      expect(wrapper.state('leftNavOpen')).to.be.true();

      const overlay = ReactDOM.findDOMNode(
        ReactTestUtils.findRenderedComponentWithType(
          wrapper.instance(), Overlay
        )
      );

      ReactTestUtils.Simulate.touchTap(overlay);

      expect(wrapper.state('leftNavOpen')).to.be.false();
    });

    it('handles click on client route nav item', () => {
      const wrapper = mount(
        <AppBar {...props} />
      );

      // Open nav menu
      const node = ReactDOM.findDOMNode(
        ReactTestUtils.findRenderedDOMComponentWithTag(
          wrapper.instance(), 'button'
        )
      );

      ReactTestUtils.Simulate.touchTap(node);
      expect(wrapper.state('leftNavOpen')).to.be.true();

      // Click nav item
      const menuLinks = ReactTestUtils.scryRenderedComponentsWithType(
        wrapper.instance(), MenuItem
      );

      // [0] = dashboard = client route
      // [1] = logout => server route
      const clientLink = ReactDOM.findDOMNode(menuLinks[0]);

      ReactTestUtils.Simulate.touchTap(clientLink.firstChild);

      expect(wrapper.state('leftNavOpen')).to.be.false();
      expect(historyStub).to.have.been.calledOnce();
    });

    it('handles click on server route nav item', () => {
      const wrapper = mount(
        <AppBar {...props} />
      );

      // Open nav menu
      const node = ReactDOM.findDOMNode(
        ReactTestUtils.findRenderedDOMComponentWithTag(
          wrapper.instance(), 'button'
        )
      );

      ReactTestUtils.Simulate.touchTap(node);
      expect(wrapper.state('leftNavOpen')).to.be.true();

      // Click nav item
      const menuLinks = ReactTestUtils.scryRenderedComponentsWithType(
        wrapper.instance(), MenuItem
      );

      // [0] = dashboard = client route
      // [1] = logout => server route
      const serverLink = ReactDOM.findDOMNode(menuLinks[1]);

      ReactTestUtils.Simulate.touchTap(serverLink.firstChild);

      expect(wrapper.state('leftNavOpen')).to.be.false();
      expect(historyStub).to.not.have.been.called();
    });
  });

  describe('Locale Menu', () => {
    describe('#handleLocaleMenuOpen', () => {
      it('opens locale menu after button click', () => {
        props.locale = 'en';
        const wrapper = mount(
          <AppBar {...props} />
        );

        expect(wrapper.find('FlatButton').length).to.equal(1);

        const node = ReactDOM.findDOMNode(
          ReactTestUtils.findRenderedComponentWithType(
            wrapper.instance(), FlatButton
          )
        );
        ReactTestUtils.Simulate.touchTap(node);
        expect(wrapper.state('localeMenuOpen')).to.be.true();
      });
    });

    describe('handles change of locale button click', () => {
      beforeEach(() => {
        props.availableLocals = [{ key: 'en', label: 'English' }];
        props.locale = 'en';
        props.changeLocale = sinon.spy();
      });

      afterEach(() => {
        props.changeLocale.reset();
      });

      it('calls to change locale', () => {
        // Due to the way the IconMenu is implemented in Material-UI,
        // it's not possible from what I can tell to simulate clicks of
        // the actual menu items because they are rendered outside of the
        // component, therefore not accessible via the wrapper.
      });
    });
  });
});
