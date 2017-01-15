import React, { Component } from 'react';
import { Text, Icon, List, ListItem, Content, Thumbnail } from 'native-base';

import styles from './styles';

import AppViewStore from '../../stores/ViewStore/AppViewStore.js';
import AuthStore from '../../stores/EntityStore/AuthStore.js';

const logo = require('../../images/logo.png');

class SideBar extends Component { // eslint-disable-line
  render() { // eslint-disable-line class-methods-use-this
    return (
      <Content style={{ backgroundColor: '#252A30' }} >
        <Thumbnail size={200} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 15, resizeMode: 'contain' }} square source={logo} />
        <List foregroundColor={'white'} >
          <ListItem
            button
            onPress={
              () => {
                AppViewStore.drawerOpened = false;
                if (AppViewStore.routeStack2[AppViewStore.routeStack2.length - 1].key !== 'home') {
                  AppViewStore.resetRoute({ key: 'home' });
                }
              }
            }
            iconLeft style={styles.links}
          >
            <Icon name="ios-home" />
            <Text >Home</Text>
          </ListItem>
          <ListItem
            button
            onPress={
              () => {
                AppViewStore.drawerOpened = false;
                AppViewStore.pushRoute({ key: 'options' });
              }
            }
            iconLeft style={styles.links}
            >
            <Icon name="ios-settings" />
            <Text>Options</Text>
          </ListItem>
          <ListItem
            button
            onPress={
              () => {
                AppViewStore.drawerOpened = false;
                AuthStore.unsetUser();
              }
            }
            iconLeft style={styles.links}
          >
            <Icon name="ios-log-out" />
            <Text>Se Déconnecter</Text>
          </ListItem>
        </List>
      </Content>
    );
  }
}

export default SideBar;
