import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {createBrowserHistory as createHistory} from 'history';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import reducer from '../Reducer/index';
import afterApiMiddleware from './MiddleWare/afterApiMiddleware';
const history = createHistory();
const localRouterMiddleware = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const arr = [localRouterMiddleware, thunk, afterApiMiddleware];
if (process.env.NODE_ENV !== 'production') arr.push(createLogger());
const store = createStore(reducer, composeEnhancers(applyMiddleware(...arr)));
if (module.hot) {
  module.hot.accept('../Reducer/index', () => {
    const nextRootReducer = require('../Reducer/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
