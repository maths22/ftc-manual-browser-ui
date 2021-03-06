import {ConnectedRouter} from 'connected-react-router';
import {Switch} from 'react-router';
import React, {Component} from 'react';
import App from './App';
import DefaultLayout from './components/DefaultLayout';

class AppRouter extends Component {

  render () {
    return <ConnectedRouter history={this.props.history}>
      <div>
        <Switch>
          <DefaultLayout exact path="/" component={App} />
          <DefaultLayout component={() => (<div>404 – Page Not Found</div>)} />
        </Switch>
      </div>
    </ConnectedRouter>;
  }
}



export default AppRouter;