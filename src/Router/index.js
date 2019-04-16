import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../Component/PrivateRoute';
import Bundle from './../Bundle';
import Home from '../Containers/Home'; // 首页组件
// 同步加载
import Entry from 'bundle-loader?lazy!../Containers/Entry'; // 首页组件
import Login from 'bundle-loader?lazy!../Containers/Login'; // 登录页组件

const createComponent = component => props => (
  <Bundle load={component}>
    {Component => { return <Component {...props} /> }}
  </Bundle>
);

// 路由配置
const RouterConfig = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={createComponent(Login)} />
        <PrivateRoute path='/Entry' component={createComponent(Entry)} />
        <Route path='/Home' component={Home} />
      </Switch>
    </div>
  );
}
// 导出
export default RouterConfig;
