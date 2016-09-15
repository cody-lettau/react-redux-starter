const _ = require('lodash');

exports.useAsContext = (wrapper) => {
  let cloned = _.cloneDeep(wrapper);

  // State
  cloned.origState = wrapper.state;
  cloned.state = wrapper.state();

  // Props
  cloned.origProps = wrapper.props;
  cloned.props = wrapper.props();

  return cloned;
};

exports.parseContextWrapper = (wrapper) => {
  // reset state
  wrapper.contextState = wrapper.state;
  wrapper.state = wrapper.origState;

  // reset props
  wrapper.contextProps = wrapper.props;
  wrapper.props = wrapper.origProps;

  return wrapper;
};
