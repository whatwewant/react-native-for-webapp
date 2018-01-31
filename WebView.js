import React, { PureComponent } from 'react';
import {
  WebView,
  StyleSheet,
  Linking,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import isUrl from 'is-url';

export default class XWebView extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;
    return {
      title: !title ? '加载中...' : title,
    };
  };

  static defaultProps = {
    onLoading: () => null,
    onDone: () => null,
  };

  onNavigationStateChange = (nav) => {
    const { onLoading, onDone } = this.props;
    if (this.props.alreadyLoadDone) return false;
  
    if (nav.loading === true) {
      onLoading();
    } else if (nav.loading === false) {
      onDone();
    } else {
      alert(`unknow nav value`);
    }
  };

  onShouldStartLoadWithRequest = (nav) => {
    const url = nav.url;

    if (url.indexOf('moeover') !== -1) {
      return true;
    }

    this.props.navigation.dispatch(NavigationActions.navigate({
      routeName: 'Browser',
      params: {
        uri: url,
      },
    }));

    return false;
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
        onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
        decelerationRate="normal"
        automaticallyAdjustContentInsets
        scalesPageToFit
        javaScriptEnabled
        domStorageEnabled
        scrollEnabled={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
});