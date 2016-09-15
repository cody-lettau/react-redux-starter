import { connect } from 'react-redux';
import AppBar from '../components/AppBar';

export const mapStateToProps = (state) => (
  {
    title: state.router.title,
  }
);

export const mapDispatchToProps = (dispatch) => ({}); // eslint-disable-line no-unused-vars

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
