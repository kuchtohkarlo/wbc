import { compose, applyMiddleware, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import history from 'history/createBrowserHistory';
import apiClient from './helpers/callAPI';
import customMIM from './helpers/minimal';
import combinedReducers from './redux/index';


export const browserHistory = history();

const env = process.env.NODE_ENV || 'development';

const initialState = window.__INITIAL_STATE__ || {};
const optionalMiddleWares = [];
const middleWares = [
  // thunk,
  thunk.withExtraArgument(new apiClient()),
  routerMiddleware(browserHistory)
];

// Redux dev tools extention
if (env !== 'production') {
  const devToolsExt =
    window.__REDUX_DEVTOOLS_EXTENTION__ && window.__REDUX_DEVTOOLS_EXTENTION__();

  if (typeof devToolsExt === 'function') {
    optionalMiddleWares.push(devToolsExt())
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// cust Minimal MiddleWare
// optionalMiddleWares.push(customMIM(new apiClient()));


const r = connectRouter(browserHistory)(combinedReducers);
const compositions = composeEnhancers(applyMiddleware(...middleWares), ...optionalMiddleWares);

// store
const store = createStore(r, initialState, compositions);


console.log('----', store);
export default store;
