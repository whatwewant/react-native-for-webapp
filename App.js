import React from 'react';
import { StackNavigator } from 'react-navigation';

import WebApp from './components/WebApp';
import Browser from './components/Browser';

const App = ({ navigation }) => (
  <WebApp
    navigation={navigation}
    headerBackgroundColor="#00BCD4"
    url="http://moeover.com/github-trending"
    // url="https://google.com"
  />
);

App.navigationOptions = WebApp.navigationOptions;

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