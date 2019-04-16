import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../Action/login';
import './index.less';
import DemoItem from '../../Component/DemoComponent';


const mapStateToProps = (state) => {
  return {addRedux:state.Login}
};

const mapDispatchToProps = (dispatch) => ({
  homeA: (num)=>{
    dispatch({
      type:'testAction',
      payload:num
    })
  },
  login: (history)=>{
    login(history)(dispatch);
  },
})

@connect(mapStateToProps, mapDispatchToProps)
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

  homeA = () => {
    this.props.addRedux && this.props.addRedux.testa && this.props.homeA(this.props.addRedux.testa+1)
  };
  login = () => this.props.login(this.props.history);
  click = () => {
    this.setState({abc:this.state.abc+1})
  };

  render () {
    return (
      <div className='login-style' >
        <button onClick={this.login}>login--></button>
        <button onClick={this.homeA}>homeA-258->props</button>
        <button onClick={this.click}>setState-->state</button>
        <div>{this.state.abc}</div>
        <div>{this.props.addRedux && this.props.addRedux.testa}</div>
        <div className='top-icon'>
          {
            this.state.dataList.map((item,i) => <DemoItem key={i} index={item.key} num={item.num}/>)
          }
        </div>
      </div>
    );
  }
}


export default Home;

