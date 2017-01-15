import React, { Component } from 'react';
import { Image, Platform } from 'react-native';
import { Container, Content, Text, InputGroup, Input, Button, Icon, View } from 'native-base';
import { observer } from 'mobx-react/native';
import login from './login-themes';
import styles from './styles';
import AppViewStore from '../../stores/ViewStore/AppViewStore.js';
import LoginViewStore from '../../stores/ViewStore/LoginViewStore.js';
import ErrorMsg from '../errorMsg';

const backgroundImage = require('../../images/glow2.png');
const logo = require('../../images/logo.png');

@observer
class Login extends Component { // eslint-disable-line

  render() { // eslint-disable-line class-methods-use-this
    const showErrors = !LoginViewStore.isValid &&
                          LoginViewStore.isSubmitted &&
                          LoginViewStore.validationErrors;
    const showEmailError = showErrors && LoginViewStore.validationErrors.email;
    const showPasswordError = showErrors && LoginViewStore.validationErrors.password;

    return (
      <Container>
        <View style={{ backgroundColor: '#384850', flex: 1 }} theme={login}>
          <Image source={backgroundImage} style={styles.container}>
            <Image source={logo} style={styles.shadow} >
              <Content style={styles.bg} keyboardShouldPersistTaps>
                <View style={{ marginBottom: 20 }}>
                  <InputGroup >
                    <Icon name="ios-person" />
                    <Input
                      placeholder="EMAIL"
                      keyboardType="email-address"
                      onChangeText={
                        LoginViewStore.isSubmitted
                        ?
                        (email) => {
                          LoginViewStore.email = email;

                          LoginViewStore.validate();
                        }
                        :
                        (email) => { LoginViewStore.email = email; }
                      }
                      value={LoginViewStore.email}
                    />
                    {showEmailError && <Icon name="ios-warning" style={{ color: 'red' }} />}
                  </InputGroup>

                  {
                    showEmailError &&
                    LoginViewStore.validationErrors.email.map((err, index) =>
                      <ErrorMsg key={index} >
                        {err}
                      </ErrorMsg>
                    )
                  }
                </View>

                <View style={{ flex: 1, marginBottom: 20 }}>
                  <InputGroup >
                    <Icon name="ios-unlock-outline" />
                    <Input
                      placeholder="PASSWORD"
                      secureTextEntry
                      onChangeText={
                        LoginViewStore.isSubmitted
                        ?
                        (password) => {
                          LoginViewStore.password = password;

                          LoginViewStore.validate();
                        }
                        :
                        (password) => { LoginViewStore.password = password; }
                      }
                      value={LoginViewStore.password}
                    />
                    {showPasswordError && <Icon name="ios-warning" style={{ color: 'red' }} />}
                  </InputGroup>
                  {
                    showPasswordError &&
                    LoginViewStore.validationErrors.password.map((err, index) =>
                      <ErrorMsg key={index} >
                        {err}
                      </ErrorMsg>
                    )
                  }
                </View>

                <Button
                  transparent
                  style={{ alignSelf: 'flex-end', marginBottom: (Platform.OS === 'ios') ? 5 : 0, marginTop: (Platform.OS === 'ios') ? -10 : 0 }}
                >
                  <Text>
                    Forgot Password
                  </Text>
                </Button>

                <Button
                  rounded
                  block
                  style={{ marginBottom: 20 }}
                  onPress={
                  () => {
                    LoginViewStore.submit();
                  }
                }
                >
                  {!LoginViewStore.isSubmitting ? <Text style={styles.buttonLog}>Se Connecter</Text> : ''}
                </Button>
              </Content>
              </Image>
            </Image>
        </View>
      </Container>
    );
  }
}

export default Login;
