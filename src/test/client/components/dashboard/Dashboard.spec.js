import React from 'react';
import casual from 'casual';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';

import Dashboard from '../../../../client/components/dashboard/Dashboard';

describe('Login - View: Component > Dashboard(page) ', () => {
  let title;
  let props;

  beforeEach(() => {
    title = casual.title;
    props = {
      onLoad: () => {},
      route: {
        props: {
          title,
        },
      },
      title,
    };

    sinon.spy(Dashboard.prototype, 'componentDidMount');
    sinon.spy(Dashboard.prototype, 'render');
  });

  afterEach(() => {
    Dashboard.prototype.componentDidMount.restore();
    Dashboard.prototype.render.restore();
  });

  describe('#render', () => {
    it('renders pending message', () => {
      mount(<Dashboard {...props} />);

      expect(Dashboard.prototype.componentDidMount).to.have.been.calledOnce();
      expect(Dashboard.prototype.render).to.have.been.calledOnce();
    });

    it('renders without route.props.title set', () => {
      delete props.route.props.title;
      mount(<Dashboard {...props} />);

      expect(Dashboard.prototype.componentDidMount).to.have.been.calledOnce();
      expect(Dashboard.prototype.render).to.have.been.calledOnce();
    });

    it('renders without route.props.title and props.title set', () => {
      delete props.route.props.title;
      delete props.title;
      mount(<Dashboard {...props} />);

      expect(Dashboard.prototype.componentDidMount).to.have.been.calledOnce();
      expect(Dashboard.prototype.render).to.have.been.calledOnce();
    });
  });
});
