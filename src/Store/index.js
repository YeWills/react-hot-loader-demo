import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {createBrowserHistory as createHistory} from 'history';
import { routerMiddleware } from 'react-router-redux';
import reducer from '../Reducer/index';
const history = createHistory();
const localRouterMiddleware = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const arr = [localRouterMiddleware, thunk];
const store = createStore(reducer, composeEnhancers(applyMiddleware(...arr)));
if (module.hot) {
  module.hot.accept('../Reducer/index', () => {
    const nextRootReducer = require('../Reducer/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
