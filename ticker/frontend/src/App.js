import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { inject, observer } from 'mobx-react';
import { Icon } from 'antd';

import ApiClient from './ApiClient';
import Login from './components/Login';
import Home from './components/Home';

@inject('UserStore')
@observer
class App extends React.Component {
  componentDidMount() {
    this.props.UserStore.getUser();
  }
  render() {
    if(this.props.UserStore.isAuthenticated) {
      return (
        <Home />
      )
    }
    else if(this.props.UserStore.isAuthenticated === null) {
      return (
        <Icon type="loading" />
      );
    }
    return (
      <Login />
    );
  }
  
}

export default App;
