'use strict'

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

import Ready from './Ready';
import ReviewGallery from './Gallery';
import Swipe from './Swipe';


class ReadyScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      // <Ready />
      <ScrollView>
        <Text>Ready to trash some photos?</Text>
        <Button
          onPress = {() => this.props.navigation.navigate('Swipe')}
          title = "Go to a profile screen"
        />
      </ScrollView>
    );
  }
}

class SwipeScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      index: (this.props.navigation.state.params === undefined) ? 0 : this.props.navigation.state.params.index,
      deletedArray: (this.props.navigation.state.params === undefined) ? [] : this.props.navigation.state.params.gallery
    };
    this.handle = this.handle.bind(this)
  }

  componentWillMount() {
    const { setParams } = this.props.navigation;

    setParams({
      index: this.state.index,
      deletedArray: this.state.deletedArray,
    });
  }

  handle(index, array) {

    this.setState({ index: index, deletedArray: array }, function() {
      const { setParams } = this.props.navigation;

      setParams({
        index: this.state.index,
        deletedArray: this.state.deletedArray
      });
    });
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Trash',
    headerStyle: {
      shadowOpacity: 0,
      shadowOffset: {
        height: 0,
      },
      elevation: 0,
      justifyContent: 'space-around',
    },
    headerTitleStyle: {
      fontFamily: 'LemonMilklight',
      alignSelf: 'center',
      fontWeight: '200', // quick fix for react-navigation quirk
      fontSize: 20,
      color: '#757575',
    },
    headerRight: <TouchableOpacity style={{
      alignItems:'center',
      justifyContent:'center',
      paddingLeft: 50,
      width:100,
      height:100,
      backgroundColor:'#FCFCFC',
      borderRadius:100,}}
      onPress = {() => navigation.navigate('Review', {
        deletedArray: navigation.state.params.deletedArray,
        index: navigation.state.params.index})}>
      <Icon name='delete-variant' color='#757575' size={30}/>
    </TouchableOpacity>,
    headerLeft: <TouchableOpacity style={{
      alignItems:'center',
      justifyContent:'center',
      paddingRight: 50,
      width:100,
      height:100,
      backgroundColor:'#FCFCFC',
      borderRadius:100,}}
      onPress={()=>{ navigation.navigate('Ready')}}>
      <Icon name='home-variant' color='#757575' size={30}/>
    </TouchableOpacity>,
  });

  render() {
    return (
      <Swipe index = {this.state.index} handle = {this.handle}/>
    );
  }
}

class ReviewScreen extends ReviewGallery {

  componentWillMount() {
    const { setParams } = this.props.navigation;

    setParams({
      index: this.props.navigation.state.params.index,
      gallery: this.props.navigation.state.params.deletedArray
    });
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Trash',
    headerStyle: {
      shadowOpacity: 0,
      shadowOffset: {
        height: 0,
      },
      elevation: 0,
      justifyContent: 'space-around',
    },
    headerTitleStyle: {
      fontFamily: 'LemonMilklight',
      alignSelf: 'center',
      fontWeight: '200', // quick fix for react-navigation quirk
      fontSize: 20,
      color: '#757575',
    },
    headerRight: <View />,
    headerLeft: <TouchableOpacity style={{
      alignItems:'center',
      justifyContent:'center',
      paddingRight: 50,
      width:100,
      height:100,
      backgroundColor:'#FCFCFC',
      borderRadius:100,}}
      onPress={()=>{ navigation.navigate('Swipe', {index: navigation.state.params.index, gallery: navigation.state.params.deletedArray}); }}>
      <Icon name='keyboard-backspace' color='#757575' size={30}/>
    </TouchableOpacity>,
  });

}

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

const styles = StyleSheet.create({
  ReviewButton: {
    alignItems:'center',
    justifyContent:'center',
    paddingLeft: 50,
    width:100,
    height:100,
    backgroundColor:'#FCFCFC',
    borderRadius:100,
  },
  HomeButton: {
    alignItems:'center',
    justifyContent:'center',
    paddingRight: 50,
    width:100,
    height:100,
    backgroundColor:'#FCFCFC',
    borderRadius:100,
  },
});

export default TrashStack;
