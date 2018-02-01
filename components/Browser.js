import React, { PureComponent } from 'react';
import {
  View,
  WebView,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
        borderBottomWidth: 0,
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
    progressColor: '#00BCD4',
    onLoading: () => null,
    onDone: () => null,
    onError: () => null,
  };

  state = {
    clientWidth: 0,
    animatedValue: new Animated.Value(0),
  };

  componentDidMount() {
    this.props.navigation.setParams({
      goBack: this.node.goBack,
    });

    this.animate();
  }

  onLayout = (event) => {
    this.setState({ clientWidth: event.nativeEvent.layout.width });
  }

  onLoading = () => {
    this.props.onLoading();
  };

  onDone = () => {
    this.props.onDone();
    // setTimeout(() => this.props.navigation.setParams({ title: nav.title }), 250);
  };

  onError = () => {
    this.props.onError();
  };

  onNavigationStateChange = (nav) => {
    // const { onLoading } = this.props;
    this.props.navigation.setParams({ title: nav.title, canGoBack: nav.canGoBack });

    // if (nav.loading === true) {
    //   onLoading();
    // } else if (nav.loading === false) {
    //   this.onDone();
    // } else {
    //   alert(`unknow nav value`);
    // }
  };

  animate() {
    this.state.animatedValue.setValue(0);

    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.bezier(.46, .34, .26, .93),
      isInteraction: false,
      useNativeDriver: this.props.useNativeDriver,
    }).start();
  }

  _renderLoading = () => {
    const progressStyle = {
      borderWidth: 0,
      backgroundColor: this.props.progressColor,
      height: 3,
      // marginTop: -2,
      transform: [{
        translateX: this.state.animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-this.state.clientWidth, -this.state.clientWidth * 0.1],
        }),
      }],
    };
    
    return (
      <View style={[styles.conatiner, { height: 3 }]} onLayout={this.onLayout}>
        <Animated.View style={progressStyle} />
      </View>
    );
  }

  _renderError = () => {
    return (
      <TouchableOpacity style={styles.conatiner} onPress={() => this.node.reload()}>
        <View style={{ marginTop: 120, width: '100%', flex: 1, alignContent: 'center' }}>
          <Ionicons
            name="md-refresh"
            size={80}
            style={{
              textAlign: 'center',
              color: 'rgba(0, 0, 0, .2)',
            }}
          />
          <Text style={{ color: 'rgba(0, 0, 0, .38)', textAlign: 'center', fontSize: 12 }}>Network error. Tap to load again.:-1001</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const params = this.props.navigation && this.props.navigation.state.params || {};
    const uri = params.url || params.uri || this.props.source.uri;

    return (
      <WebView
        ref={ref => (this.node = ref)}
        style={styles.conatiner}
        source={{ uri: uri }}
        onNavigationStateChange={this.onNavigationStateChange}
        onError={this.onError}
        onLoadStart={this.onLoading}
        // onLoad={() => alert('load')}
        onLoadEnd={this.onDone}
        renderLoading={this._renderLoading}
        renderError={this._renderError}
        decelerationRate="normal"
        automaticallyAdjustContentInsets
        scalesPageToFit
        javaScriptEnabled
        domStorageEnabled
        scrollEnabled
        startInLoadingState
      />
    );
  }
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    position: 'relative',
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