import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Icon, Text, List, ListItem, Thumbnail } from 'native-base';
import { Image, View } from 'react-native';
import { observer } from 'mobx-react/native';
import theme from '../../themes/base-theme';
import styles from './styles';
import AppViewStore from '../../stores/ViewStore/AppViewStore.js';
import AuthStore from '../../stores/EntityStore/AuthStore.js';
import HomeViewStore from '../../stores/ViewStore/HomeViewStore.js';
import ThemesStore from '../../stores/EntityStore/ThemesStore.js';
import ThemeStore from '../../stores/EntityStore/ThemeStore.js';

import Hr from 'react-native-hr';
import Swiper from 'react-native-swiper';


const backgroundImage = require('../../images/glow2.png');


@observer
class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      themes : []
    }
  }
  componentWillMount(){
    HomeViewStore._loadInitialState();
  }

  choiceTheme(themeId){
    ThemeStore.setThemeId(themeId);
    AppViewStore.pushRoute({key:'theme'});
  }

  render() { // eslint-disable-line class-methods-use-this
    return (
      <Container theme={theme} style={{ backgroundColor: '#384850' }}>
        <Image source={backgroundImage} style={styles.container} >
          <Header>
            <Button transparent onPress={() => { AppViewStore.drawerOpened = true; }}>
              <Icon name="ios-menu" />
            </Button>

            <Title>Dashboard</Title>

            <Button transparent onPress={() => AppViewStore.pushRoute({key: 'options'})}>
              <Icon name="ios-log-out" />
            </Button>
          </Header>

          <Content style={{ backgroundColor: 'transparent' }} padder>
            <View>
              <Hr lineColor='white' text="Profil" textColor='white' />
                <List>
                  <ListItem style={{borderBottomColor : 'transparent'}}>
                    <Thumbnail square size={80} source={{uri : AuthStore.user.image}} />
                    <Text>{AuthStore.user.firstName} {AuthStore.user.lastName}</Text>
                    <Text note style={{color : "white"}}>{AuthStore.user.email}</Text>
                  </ListItem>
                </List>
            </View>
            <View style={styles.wrapper}>
              <Hr lineColor='white' text="Theme" textColor='white' />
              <Swiper
                loop={false}>
              {!HomeViewStore.themesLoading ?
                (ThemesStore.themes.themes.map((theme,i) =>
                  <View key={i} style={styles.slide} onPress={() => this.choiceTheme(theme._id)}><Thumbnail size={50} source={{uri : theme.image}} onPress={() => this.choiceTheme(theme._id)}/><Text onPress={() => this.choiceTheme(theme._id)}>{theme.name}</Text></View>
                )) : (<View style={styles.slide}><Text>Chargement des thèmes...</Text></View>)
              }
              </Swiper>
            </View>
            <View>
              <Hr lineColor='white' text="Historique" textColor='white' />

            </View>
          </Content>
        </Image>
      </Container>
        );
  }
}

export default Home;
