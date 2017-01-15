import {observable} from 'mobx';
import { AsyncStorage } from 'react-native';

import AppViewStore from './AppViewStore';
import AuthStore from '../EntityStore/AuthStore.js';
import OptionStore from '../EntityStore/OptionStore.js';
import UserModel from '../../models/UserModel.js';
import AuthService from '../../services/AuthService.js';

const TOKEN_KEY = '@Token:key';

class OptionViewStore {
  @observable userLoading = true;

  _loadInitialState(){
    AsyncStorage.getItem(TOKEN_KEY).then((responseToken) => {
      if(responseToken){
        AuthService.getUser(responseToken, AuthStore.user.userId)
          .then((response) => {
            return response.json();
          })
          .then((responseJson) => {
            if(responseJson.success === true){
              const userObj = new UserModel(responseJson.data);
              OptionStore.setUser(userObj);
              this.userLoading = false;
            }
          });
      } else {
        AuthStore.unsetUser();
      }
    }).catch((error) => {
      console.log(error);
    });
  }
}

export default new OptionViewStore();
