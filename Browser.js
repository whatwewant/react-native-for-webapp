import React, { PureComponent } from 'react';
import {
  WebView,
  StyleSheet,
  Linking,
} from 'react-native';
import isUrl from 'is-url';

export default class Browser extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;
    // alert(title);
    return {
      title: !title ? '加载中...' : title,
      headerMode: "normal",
      headerStyle: {
        backgroundColor: '#00BCD4',
      },
      headerTitleStyle: {
        color: '#fff',
      },
      headerTintColor: '#fff',
    };
  };

  static defaultProps = {
    onLoading: () => null,
    onDone: () => null,
  };

  onDone = () => {
    this.props.onDone();
    // setTimeout(() => this.props.navigation.setParams({ title: nav.title }), 250);
  };

  onNavigationStateChange = (nav) => {
    const { onLoading } = this.props;
    this.props.navigation.setParams({ title: nav.title });

    if (nav.loading === true) {
      onLoading();
    } else if (nav.loading === false) {
      this.onDone();
    } else {
      alert(`unknow nav value`);
    }
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