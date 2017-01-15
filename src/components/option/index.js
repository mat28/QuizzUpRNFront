import React, { Component } from 'react';
import { TouchableOpacity,Image } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, InputGroup, Input, Picker, Text, Thumbnail,Item } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import { observer } from 'mobx-react/native';
import theme from '../../themes/base-theme';
import styles from './styles';
import AppViewStore from '../../stores/ViewStore/AppViewStore.js';
import AuthStore from '../../stores/EntityStore/AuthStore.js';
import OptionViewStore from '../../stores/ViewStore/OptionViewStore.js';
import OptionStore from '../../stores/EntityStore/OptionStore.js';

import Hr from 'react-native-hr';

const backgroundImage = require('../../images/glow2.png');

@observer
class Options extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    OptionViewStore._loadInitialState();
  }
  backRoute(){
    AppViewStore.popRoute();
  }

  render() {
    return(
      <Container theme={theme} style={{ backgroundColor: '#384850' }}>
        <Image source={backgroundImage} style={styles.container} >
          <Header>
            <Button transparent onPress={() => this.backRoute()}>
              <Icon name="ios-arrow-back" />
            </Button>
            <Title> Options </Title>
          </Header>
          <Content>
          {!OptionViewStore.userLoading ?
            (<TouchableOpacity>
              <Thumbnail square size={80} source={{uri : OptionStore.user.image}} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 10 }} />
              <Button style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }} onPress={() => AppViewStore.pushRoute({key : 'avatar'})}>Modifier Avatar</Button>
              <List>
                <Hr lineColor='white' text="Information Principale" textColor='white' />
                <ListItem>
                 <InputGroup>
                   <Icon name="ios-person" style={{ color: 'steelblue' }} />
                   <Input inlineLabel label="first Name" value={OptionStore.user.firstName} placeholder="first Name" />
                 </InputGroup>
                </ListItem>
                <ListItem>
                 <InputGroup>
                   <Icon name="ios-person" style={{ color: 'steelblue' }} />
                   <Input inlineLabel label="last Name" value={OptionStore.user.lastName} placeholder="last Name" />
                 </InputGroup>
                </ListItem>
                <ListItem style={{marginBottom:20}}>
                 <InputGroup>
                   <Icon name="ios-mail" style={{ color: 'steelblue' }} />
                   <Input inlineLabel label="email" value={OptionStore.user.email} placeholder="Email" />
                 </InputGroup>
                </ListItem>
                <Hr lineColor='white' text="Mot de passe" textColor='white'/>
                <ListItem style={{marginTop:20,marginBottom:20}}>
                 <InputGroup>
                   <Icon name="ios-lock" style={{ color: 'steelblue' }} />
                   <Input inlineLabel label="new password" placeholder="NEW PASSWORD" secureTextEntry />
                 </InputGroup>
                </ListItem>
                <ListItem>
                 <InputGroup>
                   <Icon name="ios-lock" style={{ color: 'steelblue' }} />
                   <Input inlineLabel label="confirm password" placeholder="CONFIRM PASSWORD" secureTextEntry />
                 </InputGroup>
                </ListItem>
              </List>
              <Button style={{ alignSelf: 'center', marginTop: 20 }} onPress={() => this.updateUserInfo()}>Enregistrer</Button>
            </TouchableOpacity>) : <Text> Loading Option ...</Text>}
          </Content>
        </Image>
      </Container>
    )
  }
}

export default Options;
