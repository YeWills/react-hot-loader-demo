import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import { ConnectedRouter } from 'react-router-redux';
import RouterConfig from './Router'; // 路由配置
import store from './Store'; // 引入Store
import apphistory from './history'; // 引入Store



const App = ()=>{
  return (
      <Provider store={store}>
        <ConnectedRouter history={apphistory}>
          <RouterConfig />
        </ConnectedRouter>
      </Provider>
  )
}

export default hot(module)(App);
