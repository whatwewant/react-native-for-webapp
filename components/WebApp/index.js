import React from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';

import WebView from './WebView';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export default class WebApp extends React.PureComponent {
  static navigationOptions = {
    header: null,
  };

  static defaultProps = {
    headerBackgroundColor: '#fff',
    url: '',
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
    const { navigation, headerBackgroundColor, url } = this.props;

    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: loading ? "#fff" : headerBackgroundColor, height: STATUSBAR_HEIGHT }}>
          <StatusBar
            barStyle="dark-content"
            translucent
          />
        </View>
        <WebView
          navigation={navigation}
          alreadyLoadDone={done}
          source={{ uri: url }}
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
  },
  body: {
    flex: 1,
    backgroundColor: '#00BCD4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});