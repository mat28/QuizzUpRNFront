import {observable} from 'mobx';
import { AsyncStorage } from 'react-native';

import AppViewStore from './AppViewStore';
import AuthStore from '../EntityStore/AuthStore.js';
import GameStore from '../EntityStore/GameStore.js';
import ThemeStore from '../EntityStore/ThemeStore.js';
import GameModel from '../../models/GameModel.js';
import ThemeService from '../../services/ThemeService.js';

const TOKEN_KEY = '@Token:key';

class GameViewStore {
    @observable gameLoading = true;

    _loadInitialState(){
      AsyncStorage.getItem(TOKEN_KEY).then((responseToken) => {
        if(responseToken){
          ThemeService.getRandomQuestion(responseToken, ThemeStore.themeId)
            .then((response) => {
              return response.json();
            })
            .then((responseJson) => {
              if(responseJson.success === true){
                const gameObj = new GameModel(responseJson.data);
                GameStore.setGame(gameObj);
                this.gameLoading = false;
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


export default new GameViewStore();
