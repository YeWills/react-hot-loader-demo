import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../Action/login';
import './index.less';
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
    console.log(info);
    console.log(error);
  }
  addDataList = (e) => this.setState( ({dataList}) => ({ dataList: [...dataList, {
    key: dataList.length+1, num: dataList.length+1
  }] }) )

  login = () => this.props.login(this.props.history);
  login1 = () => {
    this.setState({abc:this.state.abc+1})
  };

  render () {
    console.log(11112);
    return (
      <div className='login-style' >
        <button onClick={this.login}>login9999</button>
        <button onClick={this.login1}>addeeeeqee+ {this.state.abc}</button>
        <div>{this.state.abc}</div>
        <div className='top-icon'>
          {
            this.state.dataList.map((item,i) => <DemoItem key={i} index={item.key} num={item.num}/>)
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
