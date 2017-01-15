import {observable} from 'mobx';
import { AsyncStorage } from 'react-native';

import AppViewStore from './AppViewStore';
import AuthStore from '../EntityStore/AuthStore.js';
import ThemesStore from '../EntityStore/ThemesStore.js';
import ThemesModel from '../../models/ThemesModel.js';
import ThemeService from '../../services/ThemeService.js';

const TOKEN_KEY = '@Token:key';

class HomeViewStore {
  @observable themesLoading = true;
  _loadInitialState(){
    AsyncStorage.getItem(TOKEN_KEY).then((responseToken) => {
      if(responseToken){
        ThemeService.getAllThemes(responseToken)
          .then((response) => {
            return response.json();
          })
          .then((responseJson) => {
            if(responseJson.success === true){
              const themesObj = new ThemesModel(responseJson.data);
              ThemesStore.setThemes(themesObj);
              this.themesLoading = false;
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

export default new HomeViewStore();
