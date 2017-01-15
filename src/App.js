import React, {Component} from 'react';
import {StyleSheet} from "react-native";
import AppNavigator from './AppNavigator';
import theme from './themes/base-theme';
import autobind from 'autobind-decorator';


class App extends Component {
  @autobind;
  render(){
    return <AppNavigator /> ;
  }
}

export default App;
