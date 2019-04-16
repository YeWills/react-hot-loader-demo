import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import { login } from '../../Action/login';
import './index.less';
import svgIcon from '../../Static/Svg/adminIcon.svg';
import DemoItem from '../../Component/DemoComponent';


class Home extends Component {
  state = {
    dataList : [
      { key : 0, num: 0 },
      { key : 1, num: 1 },
      { key : 2, num: 2 },
      { key : 3, num: 3 },
      { key : 4, num: 4 },
      { key : 5, num: 5 },
      { key : 6, num: 6 }
    ],
    abc:999
  }
  componentDidCatch (error, info) {
    // eslint-disable-next-line no-console
    console.log(info);
    // eslint-disable-next-line no-console
    console.log(error);
  }
  addDataList = (e) => this.setState( ({dataList}) => ({ dataList: [...dataList, {
    key: dataList.length+1, num: dataList.length+1
  }] }) )

  login = () => this.props.login();
  login1 = () => {
    this.setState({abc:this.state.abc+1})
  };

  render () {
    console.log(1);
    // eslint-disable-next-line no-console
    return (
      <div className='login-style' >
        <button onClick={this.login1}>add++ {this.state.abc}</button>
        <div>{this.state.abc}</div>
        <div className='top-icon'>
          {
            this.state.dataList.map((item) => <DemoItem index={item.key} num={item.num}/>)
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  login: bindActionCreators(login, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
// Home.propTypes = {
// 	history: PropTypes.object
// 	cancelInfo: PropTypes.object,
// 	memo: PropTypes.string.isRequired,
// 	itemList: PropTypes.array.isRequired,
// 	fetchUser: PropTypes.func.isRequired,
// 	demoSetState: PropTypes.func.isRequired
// };
