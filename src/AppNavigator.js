import React, {Component} from 'react';
import {StatusBar, AsyncStorage} from 'react-native';

import {Drawer, Spinner, View} from 'native-base';
import { observer } from 'mobx-react/native';
import { StatusBarColor } from './themes/base-theme';

const TOKEN_KEY = "@Token:key";
const USER_ID = "@UserId:key";

//Import Component
import SideBar from './components/sideBar';
import Login from './components/login/';
import Home from './components/home/';
import Theme from './components/theme/';
import Options from './components/option';
import Game from './components/game/';
import Avatar from './components/avatar/';
//Import Store
import AppViewStore from './stores/ViewStore/AppViewStore'; //donnée vue
import AuthStore from './stores/EntityStore/AuthStore'; //donnée bdd
//Import Services
import AuthService from './services/AuthService';//lien bdd
//Import Models
import UserModel from './models/UserModel.js';


@observer
class AppNavigator extends Component {
  componentWillMount(){
    this._loadInitialState();
  }

  componentWillReact(){
    if(AppViewStore.drawerOpened && this._drawer){
      this._drawer.open();
    } else {
      this._drawer.close();
    }
  }

  _loadInitialState(){
    AppViewStore.appLoading = true;
    AsyncStorage.multiGet([TOKEN_KEY,USER_ID]).then((response) => {
        var token = response[0][1];
        var userId = response[1][1];
        if(token) {
          AuthService.getUser(token,userId)
            .then((response) => {
              return response.json();
            })
            .then((responseJson) => {
              responseJson.data
                .jwtAccessToken = token;
                if(responseJson.success === true){
                  const userObj = new UserModel(responseJson.data);
                  AuthStore.setUser(userObj);
                  AppViewStore.replaceRoute({key : 'home'});
                }
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              AppViewStore.appLoading = false;
            });
        } else {
          AppViewStore.appLoading = false;
        }
    }).catch((error) => {
      console.log(error);
    })
  }
  renderScene(){
    const routeStackKey = AppViewStore.routeStack2[AppViewStore.routeStack2.length - 1].key;
    switch (routeStackKey) {
      case 'login':
        return <Login />;
        break;
      case 'home':
        return <Home />;
        break;
      case 'options':
        return <Options/>;
        break;
      case 'theme':
        return <Theme />;
        break;
      case 'game':
        return <Game />;
        break;
      case 'result':
        return <Home />;
        break;
      case 'avatar':
        return <Avatar/>;
        break;
      default:
        return <Login />;
        break;
    }
  }
  render(){
    return(
      <Drawer
        ref={(ref) => {this._drawer = ref;}}
        onClose={() => {AppViewStore.drawerOpened = false;}}
        type='overlay'
        content={<SideBar />}
        tapToClose
        acceptPan={false}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negociatePan
      >
        <StatusBar
          backgroundColor={StatusBarColor}
          barStyle='light-content'
        />
        {AppViewStore.appLoading ?
          <View style={{flex : 1, backgroundColor:'#384850'}}>
            <Spinner style={{flex:1}}/>
          </View> :
          this.renderScene(AppViewStore.drawerOpened)}
      </Drawer>
    );
  }
}

export default AppNavigator;
