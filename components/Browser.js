import React, { PureComponent } from 'react';
import {
  Button,
  View,
  WebView,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import isUrl from 'is-url';

export default class Browser extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    // alert(JSON.stringify(navigation.state.params));
    const { title, canGoBack, goBack: webViewGoBack } = navigation.state.params;
    const { goBack: navigationGoBack } = navigation;
    
    const goBack = canGoBack ? webViewGoBack : navigationGoBack;
    const close = navigationGoBack;
    return {
      title: !title ? '加载中...' : title,
      headerMode: "normal",
      headerStyle: {
        backgroundColor: '#00BCD4',
      },
      headerTitleStyle: {
        color: '#fff',
      },
      // headerTintColor: '#fff',
      headerLeft: (
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.headerLeftIcon}
            onPress={() => goBack()}
          >
            <Ionicons
              name="ios-arrow-back"
              size={26}
              style={{
                color: '#fff',
              }}
            />
          </TouchableOpacity>
          {canGoBack ? (
            <TouchableOpacity style={styles.headerLeftIcon} onPress={() => close()}>
              <Ionicons
                name="md-close"
                size={26}
                style={{
                  color: '#fff',
                }}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      ),
    };
  };

  static defaultProps = {
    onLoading: () => null,
    onDone: () => null,
  };

  componentDidMount() {
    this.props.navigation.setParams({
      goBack: this.node.goBack,
    });
  }

  onDone = () => {
    this.props.onDone();
    // setTimeout(() => this.props.navigation.setParams({ title: nav.title }), 250);
  };

  onNavigationStateChange = (nav) => {
    const { onLoading } = this.props;
    this.props.navigation.setParams({ title: nav.title, canGoBack: nav.canGoBack });

    if (nav.loading === true) {
      onLoading();
    } else if (nav.loading === false) {
      this.onDone();
    } else {
      alert(`unknow nav value`);
    }
  };

  render() {
    const params = this.props.navigation && this.props.navigation.state.params || {};
    const uri = params.url || params.uri || this.props.source.uri;

    return (
      <WebView
        ref={ref => (this.node = ref)}
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
  headerLeft: {
    flexDirection: 'row',
    paddingLeft: 12,
  },
  headerLeftIcon: {
    width: 32,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});