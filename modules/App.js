'use strict'

import React from 'react';
import { StackNavigator } from 'react-navigation';
import HeaderIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  AsyncStorage,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  BackHandler,
  CameraRoll,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Ready from './Ready';
import FadeInView from 'react-native-fade-in-view';
import ReviewGallery from './Gallery';
import Counter from 'react-native-counter';
import Swipe from './Swipe';
import { Button } from 'react-native-elements'


class ReadyScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      photos: [],
      countFinished: false,
    };
  }

  componentWillMount() {
    CameraRoll.getPhotos({
      first: 10000,
      assetType: 'All'
    }).then(res => {
      this.setState({photos: res.edges})
    })
  }

  renderButton() {
    this.setState({countFinished: true})
  }

  render() {
    if (this.state.countFinished === false) {
      return (
        <View style = {styles.container}>
          <View style = {styles.titleContainer}>
            <Text style = {styles.title}>Trash</Text>
          </View>
          <View style = {styles.photoCounter}>
            <Text style = {styles.text}>Ready to trash </Text>
            <Counter
              end = {this.state.photos.length}                    // REQUIRED End of the counter
              start = {0}                     // Beginning of the counter
              time = {1200}                   // Duration (in ms) of the counter
              digits = {0}                    // Number of digits after the comma
              easing = "linear"
              style = {styles.countText}
              onComplete = {this.renderButton.bind(this)}
            />
            <Text style = {styles.text}> photos?</Text>
          </View>
          <View style = {styles.readyButtonContainer}>
          </View>
        </View>
      );
    } else {
      return (
        <View style = {styles.container}>
          <View style = {styles.titleContainer}>
            <Text style = {styles.title}>Trash</Text>
          </View>
          <View style = {styles.photoCounter}>
            <Text style = {styles.text}>Ready to trash </Text>
            <Counter
              end = {this.state.photos.length}                    // REQUIRED End of the counter
              start = {0}                     // Beginning of the counter
              time = {1000}                   // Duration (in ms) of the counter
              digits = {0}                    // Number of digits after the comma
              easing = "linear"
              style = {styles.countText}
              onComplete = {this.renderButton}
            />
            <Text style = {styles.text}> photos?</Text>
          </View>
          <View style={styles.readyButtonContainer}>
            <FadeInView
              duration={1200}
              style={styles.readyButtonContainer}
              //onFadeComplete={() => alert('Ready')}
            >
              <Button
                large
                raised
                fontFamily = 'LemonMilklight'
                backgroundColor = '#e91e63'
                onPress = {() => this.props.navigation.navigate('Swipe')}
                icon = {{name: 'delete-variant', type: 'material-community'}}
                title = 'START TRASHING'
                borderRadius = {50}
                containerViewStyle = {{borderRadius: 50}}
              />
            </FadeInView>
          </View>
        </View>
        );
      }
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
    console.log('constructor')
  }

  componentWillMount() {
    console.log('rendered swipe')
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
      backgroundColor: '#FCFCFC',
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
        <HeaderIcon name='delete-variant' color='#757575' size={30}/>
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
        <HeaderIcon name='home-variant' color='#757575' size={30}/>
      </TouchableOpacity>,
    });

    render() {
      console.log('render')
      return (
        <Swipe index = {this.state.index} deletedArray = {this.state.deletedArray} handle = {this.handle}/>
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
      backgroundColor: '#FCFCFC',
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
      onPress={()=>{ navigation.navigate('Swipe', {index: navigation.state.params.index, gallery: navigation.state.params.gallery}); }}>
      <HeaderIcon name='keyboard-backspace' color='#757575' size={30}/>
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
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#FCFCFC',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: 300,
    height: 300,
  },
  titleContainer: {
    flex: 2,
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'LemonMilklight',
    alignSelf: 'center',
    justifyContent: 'space-around',
    fontSize: 50,
    color: '#757575',
  },
  photoCounter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  countText: {
    fontFamily: 'LemonMilklight',
    alignSelf: 'center',
    justifyContent: 'space-around',
    fontSize: 20,
    color: '#1AC673',
  },
  text: {
    fontFamily: 'LemonMilklight',
    alignSelf: 'center',
    justifyContent: 'space-around',
    fontSize: 20,
    color: '#757575',
  },
  readyButtonContainer: {
    flex: 1
  },
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
