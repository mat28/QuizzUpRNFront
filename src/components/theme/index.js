import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Icon, Text, Thumbnail, List, ListItem } from 'native-base';
import { Image, View } from 'react-native';
import { observer } from 'mobx-react/native';
import theme from '../../themes/base-theme';
import styles from './styles';
import AppViewStore from '../../stores/ViewStore/AppViewStore.js';
import AuthStore from '../../stores/EntityStore/AuthStore.js';
import ThemeViewStore from '../../stores/ViewStore/ThemeViewStore.js';
import ThemeStore from '../../stores/EntityStore/ThemeStore.js';
import GameStore from '../../stores/EntityStore/GameStore.js';


const backgroundImage = require('../../images/glow2.png');

@observer
class Theme extends Component {
  constructor(props){
    super(props);
    this.state = {
      theme : {}
    }
  }

  componentWillMount(){
    ThemeViewStore._loadInitialState();
  }


  backRoute(){
    ThemeStore.themeid='';
    AppViewStore.popRoute();
  }

  choiceGameStyle(bool){
    if(bool){
      GameStore.training = true;
      AppViewStore.pushRoute({key : 'game'});
    } else {
      GameStore.training = false;
      AppViewStore.pushRoute({key : 'game'});
    }
  }


  render(){
    return (
      <Container theme={theme} style={{ backgroundColor: '#384850' }}>
        <Image source={backgroundImage} style={styles.container} >
          <Header>
            <Button transparent onPress={() => this.backRoute()}>
              <Icon name="ios-arrow-back" />
            </Button>

            <Title>{!ThemeViewStore.themeLoading ? "Theme " + ThemeStore.theme.name : 'Theme'}</Title>

            <Button transparent onPress={() => { AppViewStore.drawerOpened = true; }}>
              <Icon name="ios-menu" />
            </Button>
          </Header>
          <Content>
          <View>
              <List>
              {!ThemeViewStore.themeLoading ?
                (<ListItem style={{borderBottomColor : 'transparent'}}>
                  <Thumbnail square size={80} source={{uri : ThemeStore.theme.image}} />
                  <Button style={styles.button} block info onPress= {() => this.choiceGameStyle(true)}> Entrainement </Button>
                  <Button style={styles.button} block primary onPress= {() => this.choiceGameStyle(false)}> Défis </Button>
                </ListItem>) : <Text> Loading ... </Text>}
              </List>
          </View>
          </Content>
        </Image>
      </Container>
    )
  }
}

export default Theme;
