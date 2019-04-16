import types from '../Store/types';
import { reducerCreators } from '../Util/index';

const initialState = {
  name: '',
  password: '',
  token: '',
  testa: 123,
};

export default reducerCreators(initialState, {
  [`${types.SET_LOGIN_INFO}`]: (state, data, params) => {
    return Object.assign({}, state, {
      ...params
    });
  },
  [`${types.LOGIN}_ERROR`]: (state, data, params) => {
    return state;
  },
  [`${types.LOGIN}_SUCCESS`]: (state, data, params) => {
    return Object.assign({}, state, {
      ...params
    });
  },
  [`${types.LOGIN}_PENDING`]: (state, data, params) => {
    return state;
  },
  testAction:(state,data,params)=>{
    return {...state, testa:data}
  }

});
