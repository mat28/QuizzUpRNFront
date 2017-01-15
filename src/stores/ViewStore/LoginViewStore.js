import { observer } from 'mobx-react/native';
import { observable } from 'mobx';
import { AsyncStorage } from 'react-native';
import validate from 'validate.js';

import AuthService from '../../services/AuthService.js';
import AppViewStore from './AppViewStore';
import UserModel from '../../models/UserModel.js';
import AuthStore from '../EntityStore/AuthStore.js';

const TOKEN_KEY = '@Token:key';
const USER_ID = '@UserId:key';

class LoginViewStore {
  @observable email;
  @observable password;
  @observable isSubmitted=false;
  @observable isSubmitting=false;
  @observable isValid;
  @observable apiSuccess;
  @observable apiErrors;
  @observable validationErrors;
  @observable apiSuccess;
  @observable apiErrors;

  constraints = {
    email: {
      presence: true,
      email: true,
    },
    password: {
      presence: true,
    },
  };

  // methods
  validate() {
    this.validationErrors = validate({
      email: this.email,
      password: this.password }, this.constraints);
    this.isValid = !this.validationErrors;
  }
  submit() {
    this.isSubmitted = true;
    this.isSubmitting = true;

    this.validate();

    if (this.isValid === true) {
      AuthService.login(this.email, this.password)
      .then(response => response.json())
      .then((responseJson) => {
        console.log('returned response is: ', responseJson);

        if (responseJson.success === true) {
          this.apiSuccess = responseJson;

          const userObj = new UserModel(this.apiSuccess.data);
          AuthStore.setUser(userObj);

          // AppViewStore.isAsyncCallMade=true;
          AsyncStorage.multiSet([[TOKEN_KEY, AuthStore.user.token],[USER_ID, AuthStore.user.userId]])
          .then(() => {
            console.log('Successfully added data ');
          })
         .catch((error) => {
           console.log('Failed with error', error);
         })
          .finally(() => {
            // AppViewStore.isAsyncCallMade=false;
          });

          AppViewStore.replaceRoute({ key: 'home' });
          this.isSubmitting = false;
          this.email = this.password = '';
        } else {
          this.apiErrors = responseJson;
          alert(this.apiErrors.message);
        }
      })
      .catch((error) => {
        console.log('Error is: ', error);
      })
      .finally(
        () => {
          this.isSubmitting = false;
        }
      );
    } else {
      this.isSubmitting = false;
    }
  }
}

export default new LoginViewStore();
