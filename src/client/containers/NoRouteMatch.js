import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import NoRouteMatchComponent from '../components/NoRouteMatch';
import route from '../actions/route';

const NoRouteMatchContainer = (props) => <NoRouteMatchComponent {...props} />;

NoRouteMatchContainer.propTypes = {
  route: PropTypes.object.isRequired,
};

export const mapStateToProps = (state) => ({}); // eslint-disable-line no-unused-vars

export const mapDispatchToProps = (dispatch) => (
  {
    onLoad: (title, tabRoute) => {
      dispatch(route(title, tabRoute));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(NoRouteMatchContainer);
