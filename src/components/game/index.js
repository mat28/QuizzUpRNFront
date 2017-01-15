import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Icon, Text, Badge, Thumbnail } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import { Image, View } from 'react-native';
import ProgressBar from '../loaders/ProgressBar';
import { observer } from 'mobx-react/native';
import theme from '../../themes/base-theme';
import styles from './styles';
import AppViewStore from '../../stores/ViewStore/AppViewStore.js';
import AuthStore from '../../stores/EntityStore/AuthStore.js';
import GameViewStore from '../../stores/ViewStore/GameViewStore.js';
import GameStore from '../../stores/EntityStore/GameStore.js';


const backgroundImage = require('../../images/glow2.png');

@observer
class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      progress : 0
    }
  }
  componentDidUpdate(){
    if(this.state.progress >= 100){
      this.choiceResponse(false);
    }
  }
  componentWillMount(){
    this.setState({progress : 0});
    GameViewStore._loadInitialState();
  }
  choiceResponse(bool){
    GameStore.numberQuestion +=1;
    if(GameStore.numberQuestion <= 10){  
      if(bool){
        this.setState({progress : 0});
        GameStore.numberTrue += 1;
        GameViewStore._loadInitialState();
      } else {
        this.setState({progress : 0});
        GameStore.numberFalse += 1;
        GameViewStore._loadInitialState();
      }
    } else {
      AppViewStore.replaceRoute({key:"result"});
    }
  }

  render() {
    if(parseInt(this.state.progress) < 100){
      setTimeout((function() {
        this.setState({
          progress: this.state.progress + 0.5
        });
      }).bind(this), 100);
    }
  return(
    <Container theme={theme} style={{ backgroundColor: '#384850' }}>
      <Image source={backgroundImage} style={styles.container} >
        <Header>
          <Title>{!GameViewStore.gameLoading ? "Game " + GameStore.numberQuestion + " /10" : 'Game'}</Title>
        </Header>
        <Content>
        {!GameViewStore.gameLoading ?
          (<Grid>
            <ProgressBar color="theme.brandSuccess" style={{marginTop : 10}} progress={parseInt(this.state.progress, 10)}/>
            <Row style={styles.row}>
              <Badge info>
                {parseInt(this.state.progress / 10, 10)} sec
              </Badge>
              <Badge success>
                  Vrai: {GameStore.numberTrue}
              </Badge>
              <Badge error>
                  Faux: {GameStore.numberFalse}
              </Badge>
            </Row>
            <Row style={{ alignSelf: 'center', marginTop: 20}}>
              <Thumbnail size={100} source={{uri : "http://localhost:3000/images/btp.png"}} style={{ alignSelf: 'center', marginTop: 20}} />
            </Row>
            <Row style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20}}>
              <Text style={{fontSize : 20}}> Question : {GameStore.numberQuestion} / 10 </Text>

            </Row>
            <Row style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20}}>
              <Text style={{fontSize : 14}}> {GameStore.question.name} </Text>
            </Row>
            <Row style={{flex:1, alignSelf: 'center', marginTop: 20, marginBottom: 20, justifyContent: 'space-between'}}>
              <Button style={{margin : 5,width:150,backgroundColor: this.state.backgroundColor}} onPress={() => this.choiceResponse(GameStore.question.responses[0].responseTrue)} > {GameStore.question.responses[0].name} </Button>
              <Button style={{margin : 5,width:150,backgroundColor: this.state.backgroundColor}} onPress={() => this.choiceResponse(GameStore.question.responses[1].responseTrue)}> {GameStore.question.responses[1].name} </Button>
            </Row>
            <Row style={{flex: 1, alignSelf: 'center', marginTop: 20, marginBottom: 20, justifyContent: 'space-between'}}>
              <Button style={{margin : 5,width:150,backgroundColor: this.state.backgroundColor}} onPress={() => this.choiceResponse(GameStore.question.responses[2].responseTrue)}> {GameStore.question.responses[2].name} </Button>
              <Button style={{margin : 5,width:150,backgroundColor: this.state.backgroundColor}} onPress={() => this.choiceResponse(GameStore.question.responses[3].responseTrue)}> {GameStore.question.responses[3].name} </Button>
            </Row>
          </Grid>) : <Text> Loading Game ...</Text>}
        </Content>
      </Image>
    </Container>
  )
  }
}

export default Game;
