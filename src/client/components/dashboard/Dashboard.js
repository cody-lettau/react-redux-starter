import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import T from 'i18n-react';
import LoadingIndicator from '../ui-components/LoadingIndicator';
import { populateTitle } from '../../resources/helpers';
import AppTheme from '../../resources/theme';

const Dashboard = React.createClass({
  propTypes: {
    onLoad: React.PropTypes.func.isRequired,
    route: React.PropTypes.object,
    title: React.PropTypes.string,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      isLoading: false,
    };
  },

  getChildContext() {
    return { muiTheme: getMuiTheme(AppTheme) };
  },

  componentDidMount() {
    populateTitle(this.props);
  },

  render() {
    return (
      <div className="dashboard-container">
        {this.state.isLoading ? <LoadingIndicator /> : null}
        <Card>
          <CardText>
            <h2><T.text text={{ key: 'welcome.hello', name: 'World' }} /></h2>
            <p><T.text text={{ key: 'welcome.intro' }} /></p>
            <p><T.text text={{ key: 'welcome.downloadsText', context: 1 }} /></p>
          </CardText>
        </Card>
      </div>
    );
  },
});

export default Dashboard;
