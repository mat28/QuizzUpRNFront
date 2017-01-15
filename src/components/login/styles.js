const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,

  },
  shadow: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: 'transparent',
  },
  bg: {
    flex: 1,
    marginTop: (deviceHeight / 2) - 15,
    backgroundColor: 'steelblue',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 70,
  },
  buttonLog: {
    color: 'steelblue',
  }
});
