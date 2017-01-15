
const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  roundedButton: {
    alignSelf: 'center',
    marginTop: 40,
    backgroundColor: '#00c497',
    borderRadius: 90,
    width: 65,
    height: 65,
  },
  row: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  name: {
    color: 'red',
  },
  text: {
    marginBottom: 10,
    fontSize: 18,
  },
  button : {
    margin : 5
  },
});
