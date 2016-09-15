import casual from 'casual';
import { expect } from 'chai';
import sinon from 'sinon';
import * as helpers from '../../../client/resources/helpers';

let callback;

describe('Resources: helpers.js', () => {
  describe('.populateTitle', () => {
    let props;

    describe('param route.props has title', () => {
      beforeEach(() => {
        callback = sinon.spy();
        props = {
          onLoad: callback,
          route: {
            props: { title: casual.title },
          },
        };
      });

      afterEach(() => {
        callback.reset();
      });

      it('populates with props.route.props.title value', () => {
        helpers.populateTitle(props);

        expect(callback).to.have.been.calledOnce();
        expect(callback).to.be.calledWith(props.route.props.title);
      });
    });

    describe('param route.props does not exit / no title', () => {
      describe('title passed in params', () => {
        beforeEach(() => {
          callback = sinon.spy();
          props = {
            onLoad: callback,
            title: casual.title,
          };
        });

        afterEach(() => {
          callback.reset();
        });

        it('populates with props.title', () => {
          helpers.populateTitle(props);

          expect(callback).to.have.been.calledOnce();
          expect(callback).to.be.calledWith(props.title);
        });
      });

      describe('no title passed in params', () => {
        beforeEach(() => {
          callback = sinon.spy();
          props = {
            onLoad: callback,
          };
        });

        afterEach(() => {
          callback.reset();
        });

        it('populates with no title', () => {
          helpers.populateTitle(props);

          expect(callback).to.have.been.calledOnce();
          expect(callback).to.be.calledWith();
        });
      });
    });
  });
});
