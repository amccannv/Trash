import React, { Component } from 'react';
import Swiper from './modules/Swiper';
import TrashStack from './modules/App';
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
} from 'react-native';

console.log = function () {};
console.info = function () {};
console.warn = function () {};
console.error = function () {}
console.debug = function () {}

export default class Trash extends Component {
  render() {
    return (
      <TrashStack />
    );
  }
}

AppRegistry.registerComponent('Trash', () => Trash);
