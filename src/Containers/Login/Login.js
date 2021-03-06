import React, { Component } from 'react';
import { Layout, Button } from 'antd';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './index.less';

export default class Login extends Component {
  state = {
    labelArray: ['button', 'checkbox']
  }
  componentWillMount () {
  }
  nameChange = (value) => {
    this.props.change({ name: value });
  }
  passwordChange = (value) => {
    this.props.login(this.props.history);
  }
  render () {
    return (
      <div className='login-style' >
        <div className='top-icon'>
          <div className='top-header'>
            <NavLink to='/'>
              <img alt='' className='top-logo' src={require('../../Static/Svg/adminIcon.svg')} />
              <span className='top-title'>Jack Qian`s BLOG</span>
            </NavLink>
          </div>
          <Button onClick={() => { this.nameChange('Jack'); }} > Jack</Button>
          <Button onClick={() => { this.passwordChange(2333) }} > 2333</Button>
          <p className='top-desc'>Jack Qian 一个走在全栈路上的小小前端程序猿</p>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  change: PropTypes.func.isRequired
};
