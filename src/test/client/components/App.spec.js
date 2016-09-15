import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Translator from 'i18n-react-loader';
import AppTheme from '../../../client/resources/theme';
import EnzymeHelpers from '../../helpers/enzyme-helpers';

import App from '../../../client/components/App';

describe('Client View: Component > App', () => {
  const shallowWithContext = (node) => shallow(node, { context: { AppTheme } });
  const props = {};

  describe('#render', () => {
    it('renders client app component', () => {
      props.error = null;
      const wrapper = shallowWithContext(<App {...props} />);

      expect(wrapper.props().className).to.equal('app');
    });
  });

  describe('#changeLocale', () => {
    let setLocaleStub;

    beforeEach(() => {
      setLocaleStub = sinon.stub(Translator, 'setLocale').returnsPromise().resolves();
    });

    afterEach(() => {
      setLocaleStub.restore();
    });

    it('initiates locale', () => {
      props.error = null;
      const wrapper = shallowWithContext(<App {...props} />);

      expect(wrapper.state('localeKey')).to.not.equal(undefined);
    });

    it('changes to different locale', () => {
      props.error = null;
      const newLocale = 'sp';
      let wrapper = shallowWithContext(<App {...props} />);

      const wrapperContext = EnzymeHelpers.useAsContext(wrapper);
      App.prototype.changeLocale.call(wrapperContext, newLocale);
      wrapper = EnzymeHelpers.parseContextWrapper(wrapperContext);

      expect(setLocaleStub).to.have.been.called();
      expect(wrapper.state('localeKey')).to.equal(newLocale);
    });

    it('ignores change to same locale', () => {
      props.error = null;
      let wrapper = shallowWithContext(<App {...props} />);
      const currentLocale = wrapper.state('localeKey');

      const wrapperContext = EnzymeHelpers.useAsContext(wrapper);
      App.prototype.changeLocale.call(wrapperContext, currentLocale);
      wrapper = EnzymeHelpers.parseContextWrapper(wrapperContext);

      expect(setLocaleStub).to.not.have.been.called();
    });
  });
});
