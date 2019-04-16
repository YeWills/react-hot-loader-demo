import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Entry from './Entry';
import Login from './Login';

export default combineReducers({
  Entry,
  Login,
  routing: routerReducer
});
