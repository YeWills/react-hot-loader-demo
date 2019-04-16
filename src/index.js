import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// AppContainer 是一个 HMR 必须的包裹(wrapper)组件
import { AppContainer } from 'react-hot-loader';
import { ConnectedRouter } from 'react-router-redux';
import {createBrowserHistory as createHistory} from 'history';
import RouterConfig from './Router'; // 路由配置
import store from './Store'; // 引入Store

const history = createHistory();


const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </Provider>
  </AppContainer>,
  document.getElementById('root'));
};

render(RouterConfig);

if (module.hot) {
  module.hot.accept('./Router', () => { render(RouterConfig); });
}
