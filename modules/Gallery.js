import React, { Component } from 'react';
import PhotoGrid from 'react-native-photo-grid';
import { View, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';
import Modal from 'react-native-modal';
import RNFetchBlob from 'react-native-fetch-blob';
var RNGRP = require('react-native-get-real-path');
var RNFS = require('react-native-fs');

import ReviewImage from './ReviewImage';

class ReviewGallery extends React.Component {

  constructor() {
    super();
    this.state = {
      items: [],
      progress: 0,
      indeterminate: true,
      isVisible: false,
    };
    this.handle = this.handle.bind(this)
  }

  componentDidMount() {
    // let items = this.props.navigation.state.params.deletedArray.map((v, i) => {
    //   return { id: i, src: this.props.navigation.state.params.deletedArray[i].src delete: true}
    // });
    this.setState({ items: this.props.navigation.state.params.deletedArray });
  }

  animate() {
    this.setState({isVisible: true})
    let progress = 0;
    this.setState({ progress });
    setTimeout(() => {
      this.setState({ indeterminate: false });
      const handle = setInterval(() => {
        //progress += Math.random() / 5;
        progress += 0.01
        if (progress > 1) {
          progress = 1;
          clearInterval(handle)
          //setTimeout(() => {this.setState({isVisible: false})}, 500);
        }
        this.setState({ progress });
      }, 21);
    }, 100);
  }

  render() {

    var loadingCircle = null;
    if (this.state.isVisible) {
      loadingCircle = (<Progress.Circle
        size = {200}
        showsText = {true}
        style = {styles.progress}
        progress = {this.state.progress}
        indeterminate = {this.state.indeterminate}
        color = '#1AC673'
      />);
    }

    if (this.state.items.length !== 0) {
      return(
        <View style = {styles.container}>
          <PhotoGrid
            data = { this.state.items }
            itemsPerRow = { 3 }
            itemMargin = { 1 }
            renderItem = { this.renderItem }
            handle = {this.handle}
            style = {styles.container}
          />
          <TouchableOpacity style={styles.trashButton}>
            <Icon
              name = 'delete-variant'
              color = '#FCFCFC'
              size = {50}
              style = {{justifyContent: 'center'}}
              onPress = {() => Alert.alert(
                'About to Trash',
                'Are you sure you want to trash the selected photos?',
                [
                  {text: 'CANCEL', onPress: () => console.log('Cancel Pressed!'), style: 'cancel'},
                  {text: 'TRASH', onPress: this.deleteImageFile.bind(this)},
                ]
              )}
            />
          </TouchableOpacity>
          <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            {loadingCircle}
          </View>
        </View>
      );
    }
    else if (this.state.items.length === 0) {
      return(
        <View style = {styles.noPhotosContainer}>
          <View>
            <Text style = {styles.noPhotosText}>No More Photos to Trash</Text>
            <Text style = {styles.noPhotosTextSecond}>Go Back for More</Text>
          </View>
        </View>
      )
    }
  }

  handle(item) {
    const tempItems = this.state.items;
    console.log(tempItems);
    tempItems.find(x => x.id === item.id).delete = !tempItems.find(x => x.id === item.id).delete;
    this.setState({items: tempItems}, function() {
      const { setParams } = this.props.navigation;

      setParams({
        index: this.props.navigation.state.params.index,
        gallery: this.state.items
      });
    });
  }

  deleteImageFile() {
    this.animate();
    setTimeout(() => {
      this.setState({isVisible: false, progress: 0})
      const promises = []
      counter = 0
      const tempItems = this.state.items
      console.log(tempItems)
      for (i = 0; i < tempItems.length; i++) {
        if(tempItems[i].delete === true) {
          imageURI = tempItems[i].src
          promises.push(RNGRP.getRealPathFromURI(imageURI).then(filePath =>
            RNFS.unlink(filePath)
            .then(() => {
              RNFetchBlob.fs.scanFile([ { path : filePath } ])
            })));
          }
        }

        Promise.all(promises)
        .then(() => {
          console.log('did I get here again')
          var temp = tempItems.filter(function(e) { return e.delete !== true })
          this.setState({items: temp}, function() {
            const { setParams } = this.props.navigation;

            setParams({
              index: this.props.navigation.state.params.index,
              gallery: this.state.items
            });
          });
          console.log(this.state.items)
        })
        .catch((e) => {
          console.log(e)
        });
      }, 4000)
    }

    renderItem(item, itemSize, handle) {
      return(
        <TouchableOpacity
          key = { item.id }
          style = {{ width: itemSize, height: itemSize }}
          onPress = { () => {
            // Do Something
          }}>
          <View style = {styles.container}>
            <Image
              resizeMode = "cover"
              style = {{ flex: 1 }}
              source = {{ uri: item.src }}
            />
            <ReviewImage handle = {handle} currentItem = {item}/>
          </View>
        </TouchableOpacity>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FCFCFC',
    },
    noPhotosContainer: {
      flex: 1,
      backgroundColor: '#FCFCFC',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    checkbox: {
      position: 'absolute',
      bottom: '5%',
      right: '5%',
    },
    modal: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    trashButton: {
      position: 'absolute',
      bottom: '5%',
      right: '5%',
      justifyContent: 'center',
      alignItems: 'center',
      width:75,
      height:75,
      backgroundColor:'#e91e63',
      borderRadius:75,
    },
    saveButton: {
      alignItems:'center',
      justifyContent:'center',
      paddingRight: 50,
      width:100,
      height:100,
      backgroundColor:'#FCFCFC',
      borderRadius:100,
    },
    noPhotosText: {
      fontFamily: 'LemonMilklight',
      alignSelf: 'center',
      fontWeight: '200', // quick fix for react-navigation quirk
      fontSize: 20,
      color: '#757575',
    },
    noPhotosTextSecond: {
      fontFamily: 'LemonMilklight',
      alignSelf: 'center',
      fontWeight: '200', // quick fix for react-navigation quirk
      fontSize: 17,
      color: '#757575',
    },
  });

  export default ReviewGallery;
