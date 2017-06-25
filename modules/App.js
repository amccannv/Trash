import React from 'react';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import Swipe from './Swipe';

const ReadyScreen = ({ navigation, banner }) => (
  <ScrollView>
    <Button
      onPress = {() => navigation.navigate('Swipe')}
      title = "Go to a profile screen"
    />
  </ScrollView>
);

const ReviewScreen = ({ navigation }) => (
  <Swipe />
);
ReviewScreen.navigationOptions = {
  title: 'Welcome',
};

const SwipeScreen = ({ navigation }) => (
  <Swipe />
);
SwipeScreen.navigationOptions = {
  title: 'Trash',
  headerStyle: {
    shadowOpacity: 0,
    shadowOpacity: 0,
    shadowOffset: {
      height: 0,
    },
    elevation: 0,
  },
  headerTitleStyle: {
    fontFamily: 'LemonMilklight',
    fontWeight: '200', // quick fix for react-navigation quirk
    fontSize: 20,
    color: '#757575',
  }
};

const TrashStack = StackNavigator({
  Ready: {
    screen: ReadyScreen,
  },
  Swipe: {
    screen: SwipeScreen,
  },
  Review: {
    screen: ReviewScreen,
  },
});

export default TrashStack;
