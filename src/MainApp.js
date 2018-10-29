import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import MainRoutes from './routes';
import store, { browserHistory } from './redux';
import './static/index.css'; // Global CSS


export default class MainApp extends React.PureComponent {
  render () {
    console.log(store, browserHistory);
    debugger;
    return (
      <Provider store={ store || {} }>
        <ConnectedRouter history={ browserHistory }>
          <MainRoutes />
        </ConnectedRouter>
      </Provider>
    )
  }
}
