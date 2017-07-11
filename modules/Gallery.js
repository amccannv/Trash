import React, { Component } from 'react';
import PhotoGrid from 'react-native-photo-grid';
import { View, Image, TouchableOpacity, Text, StyleSheet }from 'react-native';
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFetchBlob from 'react-native-fetch-blob';
var RNGRP = require('react-native-get-real-path');
var RNFS = require('react-native-fs');

import ReviewImage from './ReviewImage';

class ReviewGallery extends React.Component {

  constructor() {
    super();
    this.state = {
      items: [],
    };
    this.handle = this.handle.bind(this)
  }

  componentDidMount() {
    // let items = this.props.navigation.state.params.deletedArray.map((v, i) => {
    //   return { id: i, src: this.props.navigation.state.params.deletedArray[i].src delete: true}
    // });
    this.setState({ items: this.props.navigation.state.params.deletedArray });
  }

  render() {
    return(
      <PhotoGrid
        data = { this.state.items }
        itemsPerRow = { 3 }
        itemMargin = { 1 }
        renderItem = { this.renderItem }
        handle = {this.handle}
      />
    );
  }

  handle(item) {
    const tempItems = this.state.items;
    tempItems[item.id].delete = !tempItems[item.id].delete;
    this.setState({items: tempItems}, function() {
      const { setParams } = this.props.navigation;

      setParams({
        index: this.props.navigation.state.params.index,
        gallery: this.state.items
      });
    });
  }

  deleteImageFile() {

    console.log('made it here')
    const tempItems = this.state.items
    for (i = 0; i < tempItems.length; i++) {
      if(tempItems[i].delete === true) {
        imageURI = tempItems[i].src
        RNGRP.getRealPathFromURI(imageURI).then(filePath =>
          RNFS.unlink(filePath)
          .then(() => {
            RNFetchBlob.fs.scanFile([ { path : filePath } ])
            .then(() => {
              tempItems.splice(i + 1, 1);
              console.log("scan file success")
            })
            .catch((err) => {
              console.log("scan file error")
            })
            console.log('FILE DELETED');
          })
          .catch((err) => {
            console.log(err.message);
          })
        )
      }
    }
    this.setState({ items: tempItems})
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
  checkbox: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
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
});


export default ReviewGallery;
