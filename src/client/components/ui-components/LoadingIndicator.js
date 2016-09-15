import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const LoadingIndicator = function render() {
  const style = {
    wrapper: {
      position: 'fixed',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  return (
    <div className="loading-wrapper" style={style.wrapper}>
      <CircularProgress size={2} />
    </div>
  );
};

LoadingIndicator.contextTypes = {
  muiTheme: React.PropTypes.object,
};

export default LoadingIndicator;
