import {observable} from 'mobx';
import { AsyncStorage } from 'react-native';

import AppViewStore from './AppViewStore';
import AuthStore from '../EntityStore/AuthStore.js';
import ThemeStore from '../EntityStore/ThemeStore.js';
import ThemeModel from '../../models/ThemeModel.js';
import ThemeService from '../../services/ThemeService.js';

const TOKEN_KEY = '@Token:key';

class ThemeViewStore {
  @observable themeLoading = true;

  _loadInitialState(){
    AsyncStorage.getItem(TOKEN_KEY).then((responseToken) => {
      if(responseToken){
        ThemeService.getOneTheme(responseToken, ThemeStore.themeId)
          .then((response) => {
            return response.json();
          })
          .then((responseJson) => {
            if(responseJson.success === true){
              const themeObj = new ThemeModel(responseJson.data);
              ThemeStore.setTheme(themeObj);
              this.themeLoading = false;
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

export default new ThemeViewStore();
