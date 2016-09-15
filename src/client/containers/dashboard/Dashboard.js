import { connect } from 'react-redux';
import Component from '../../components/dashboard/Dashboard';
import route from '../../actions/route';

export const mapStateToProps = (state) => ({}); // eslint-disable-line no-unused-vars

export const mapDispatchToProps = (dispatch) => (
  {
    onLoad: (title) => {
      dispatch(route(title));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Component);
