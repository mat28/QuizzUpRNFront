import React, {Component} from 'react';
import {Text, View} from 'native-base';

class ErrorMsg extends Component {
  static propTypes = {
    children : React.PropTypes.string
  }

  render(){
    return(
      <View {...this.props} style={{flex : 1 , marginTop: 5, alignSelf: 'flex-end'}}>
        <Text style={{fontSize : 12}}>
          {this.props.children && this.props.children.toUpperCase()}
        </Text>
      </View>
    );
  }
}
