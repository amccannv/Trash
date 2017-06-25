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

const ReadyScreen = ({ navigation, banner }) => (
// <Ready />
  <ScrollView>
    <Text>Ready to trash some photos?</Text>
    <Button
      onPress = {() => navigation.navigate('Swipe')}
      title = "Go to a profile screen"
    />
  </ScrollView>
);
ReadyScreen.navigationOptions = {
  header: null,
};

const ReviewScreen = ({ navigation }) => (
  <ReviewGallery />
);
ReviewScreen.navigationOptions = {
  title: 'Welcome',
};

const SwipeScreen = ({ navigation }) => (
  <Swipe />
);
SwipeScreen.navigationOptions = ({ navigation }) => ({
  title: 'Trash',
  headerStyle: {
    shadowOpacity: 0,
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
  headerRight: <TouchableOpacity style={styles.ReviewButton}
    onPress={()=>{ navigation.navigate('Ready'); }}>
    <Icon name='delete-variant' color='#757575' size={30}/>
  </TouchableOpacity>,
  headerLeft: <TouchableOpacity style={styles.HomeButton}
    onPress={()=>{ navigation.navigate('Ready'); }}>
    <Icon name='home-variant' color='#757575' size={30}/>
  </TouchableOpacity>,
});

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
