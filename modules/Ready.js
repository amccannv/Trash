import React, { Component } from 'react';
import Swiper from './Swiper';
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

export default class Ready extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor='#D0D0D0'
        />
        <Image source={require('../img/ic_launcher.png')} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
});
