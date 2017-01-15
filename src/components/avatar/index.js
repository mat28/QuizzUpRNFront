import React, { Component } from 'react';
import { TouchableOpacity,Image, Platform } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, InputGroup, Input, Picker, Text, Thumbnail } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import { observer } from 'mobx-react/native';
import theme from '../../themes/base-theme';
import styles from './styles';
import AppViewStore from '../../stores/ViewStore/AppViewStore.js';
import AuthStore from '../../stores/EntityStore/AuthStore.js';
import OptionViewStore from '../../stores/ViewStore/OptionViewStore.js';
import OptionStore from '../../stores/EntityStore/OptionStore.js';

const Item = Picker.Item;
const backgroundImage = require('../../images/glow2.png');
@observer
class Avatar extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    OptionViewStore._loadInitialState();
  }

  backRoute(){
    AppViewStore.popRoute();
  }

  onValueChangeEyes(value: string) {
    OptionStore.selectedEye = value;
  }
  onValueChangeNose(value: string) {
    OptionStore.selectedNose = value;
  }
  onValueChangeMouth(value: string) {
    OptionStore.selectedMouth = value;
  }
  onValueChangeColor(value: string) {
    OptionStore.selectedColor = value;
  }

  render(){
    return (
      <Container theme={theme} style={{ backgroundColor: '#384850' }}>
        <Image source={backgroundImage} style={styles.container} >
          <Header>
            <Button transparent onPress={() => this.backRoute()}>
              <Icon name="ios-arrow-back" />
            </Button>
            <Title> Changement d'avatar </Title>
          </Header>
          <Content>
          {!OptionViewStore.userLoading ?
            (<List>
              <Thumbnail square size={80} source={{uri : OptionStore.getUrlImage()}} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 10 }} />
                <ListItem>
                  <Text>Yeux</Text>
                  <Picker
                    iosHeader="Choix des yeux"
                    mode="dropdown"
                    selectedValue={OptionStore.selectedEye}
                    onValueChange={this.onValueChangeEyes.bind(this)}
                    style={{marginLeft: (Platform.OS === 'android') ? 0 : -25 }}>
                      <Item label="Yeux 1" value="eyes1" />
                      <Item label="Yeux 2" value="eyes2" />
                      <Item label="Yeux 3" value="eyes3" />
                      <Item label="Yeux 4" value="eyes4" />
                      <Item label="Yeux 5" value="eyes5" />
                      <Item label="Yeux 6" value="eyes6" />
                      <Item label="Yeux 7" value="eyes7" />
                      <Item label="Yeux 8" value="eyes9" />
                      <Item label="Yeux 9" value="eyes10" />
                  </Picker>
                </ListItem>
                <ListItem >
                  <Text>Nez</Text>
                  <Picker
                    iosHeader="Choix du nez"
                    mode="dropdown"
                    selectedValue={OptionStore.selectedNose}
                    onValueChange={this.onValueChangeNose.bind(this)}
                    style={{ marginLeft: (Platform.OS === 'android') ? 0 : -25 }}>
                      <Item label="Nez 1" value="nose2" />
                      <Item label="Nez 2" value="nose3" />
                      <Item label="Nez 3" value="nose4" />
                      <Item label="Nez 4" value="nose5" />
                      <Item label="Nez 5" value="nose6" />
                      <Item label="Nez 6" value="nose7" />
                      <Item label="Nez 7" value="nose8" />
                      <Item label="Nez 8" value="nose9" />
                  </Picker>
                </ListItem>
                <ListItem >
                  <Text>Bouche</Text>
                  <Picker
                    iosHeader="Choix de la bouche"
                    mode="dropdown"
                    selectedValue={OptionStore.selectedMouth}
                    onValueChange={this.onValueChangeMouth.bind(this)}
                    style={{ marginLeft: (Platform.OS === 'android') ? 0 : -25 }}>
                      <Item label="Bouche 1" value="mouth1" />
                      <Item label="Bouche 2" value="mouth3" />
                      <Item label="Bouche 3" value="mouth5" />
                      <Item label="Bouche 4" value="mouth6" />
                      <Item label="Bouche 5" value="mouth7" />
                      <Item label="Bouche 6" value="mouth9" />
                      <Item label="Bouche 7" value="mouth10" />
                      <Item label="Bouche 8" value="mouth11" />
                  </Picker>
                </ListItem>
                <Button style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }} onPress={() => Actions.Avatar()}>Modifier Avatar</Button>
              </List>)
              : <Text> Loading Avatar... </Text>}
          </Content>
        </Image>
      </Container>
    )
  }
}

export default Avatar;
