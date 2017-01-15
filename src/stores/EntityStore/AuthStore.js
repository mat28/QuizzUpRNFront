// import { observer } from 'mobx-react/native';
import { AsyncStorage } from 'react-native';
import { observable, computed } from 'mobx';
import AppViewStore from '../ViewStore/AppViewStore.js';

const TOKEN_KEY = '@Token:key';

class AuthStore {
  @observable user;
  // @observable isClickedLogOut=false;
  @computed get isLoggedIn() {
    return this.user;
  }
  //  methods
  setUser(user) {
    this.user = user;
    // AppViewStore.isAppLoading=true;
    // console.log('user details in AuthStore: ' + this.user.token + '...' + this.user.email);
  }

  unsetUser() {
    AppViewStore.replaceRoute({ key: 'login' });
    // this.isClickedLogOut=true;
    AsyncStorage.removeItem(TOKEN_KEY)
    .then(() => {
      console.log('Data Removed');
    })
    .catch((error) => {
      console.log('Error in removing data: ', error);
    });
    this.user = null;
    // AppViewStore.isAppLoading=false;
  }

}

export default new AuthStore();
