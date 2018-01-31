import React from 'react';
import { StyleSheet, View, Text, StatusBar, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Browser from './Browser';
import WebView from './WebView';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

class App extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    loading: false,
    done: false,
  };

  onLoading = () => this.setState({ loading: true });

  onDone = () => {
    setTimeout(() => this.setState({ loading: false, done: true }), 1000);
  };

  render() {
    const { loading, done } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: loading ? "#fff" : "#00BCD4", height: STATUSBAR_HEIGHT }}>
          <StatusBar
            barStyle="dark-content"
            translucent
          />
        </View>
        <WebView
          navigation={navigation}
          alreadyLoadDone={done}
          source={{ uri: 'http://moeover.com/github-trending' }}
          onLoading={this.onLoading}
          onDone={this.onDone}
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

export default StackNavigator({
  Root: {
    screen: App,
  },
  Browser: {
    screen: Browser,
  },
}, {
  // headerMode: "none",
});