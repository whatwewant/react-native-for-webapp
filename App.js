import React from 'react';
import { StyleSheet, View, Text,  WebView, StatusBar, Platform } from 'react-native';
import Browser from './Browser';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: "#00BCD4", height: STATUSBAR_HEIGHT }}>
          <StatusBar
            barStyle="dark-content"
            translucent
          />
        </View>
        <Browser
          source={{ uri: 'http://moeover.com/github-trending' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    // backgroundColor: 'black',
    // alignItems: 'center',
    // justifyContent: 'flex-start',
  },
  statusBar: {
    backgroundColor: 'rgb(0, 188, 212)',
  },
  body: {
    flex: 1,
    backgroundColor: '#00BCD4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
