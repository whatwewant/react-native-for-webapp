import React, { PureComponent } from 'react';
import {
  WebView,
  StyleSheet,
  Linking,
} from 'react-native';

export default class Browser extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;
    // alert(title);
    return {
      title: !title ? '加载中...' : title,
    };
  };

  onNavigationStateChange = (nav) => {
    
  };

  componentDidMount() {}

  render() {
    const params = this.props.navigation && this.props.navigation.state.params || {};
    const uri = params.url || params.uri || this.props.source.uri;

    return (
      <WebView
        style={styles.conatiner}
        source={{ uri: uri }}
        onNavigationStateChange={this.onNavigationStateChange}
        decelerationRate="normal"
        automaticallyAdjustContentInsets
        scalesPageToFit
        javaScriptEnabled
        domStorageEnabled
        scrollEnabled
      />
    );
  }
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
});