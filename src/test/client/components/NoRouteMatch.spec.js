import React from 'react';
import casual from 'casual';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';

import Pending from '../../../client/components/NoRouteMatch';

describe('Client View: Component > NoRouteMatch(page) ', () => {
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

    sinon.spy(Pending.prototype, 'componentDidMount');
    sinon.spy(Pending.prototype, 'render');
  });

  afterEach(() => {
    Pending.prototype.componentDidMount.restore();
    Pending.prototype.render.restore();
  });

  describe('#render', () => {
    it('renders not found message', () => {
      mount(<Pending {...props} />);

      expect(Pending.prototype.componentDidMount).to.have.been.calledOnce();
      expect(Pending.prototype.render).to.have.been.calledOnce();
    });

    it('renders without route.props.title set', () => {
      delete props.route.props.title;
      mount(<Pending {...props} />);

      expect(Pending.prototype.componentDidMount).to.have.been.calledOnce();
      expect(Pending.prototype.render).to.have.been.calledOnce();
    });

    it('renders without route.props.title and props.title set', () => {
      delete props.route.props.title;
      delete props.title;
      mount(<Pending {...props} />);

      expect(Pending.prototype.componentDidMount).to.have.been.calledOnce();
      expect(Pending.prototype.render).to.have.been.calledOnce();
    });
  });
});
