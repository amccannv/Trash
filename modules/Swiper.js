'use strict';

import React from 'react';
import {StyleSheet, Text, View, Image, CameraRoll} from 'react-native';
import {RippleLoader} from 'react-native-indicator';
import SwipeCards from 'react-native-swipe-cards';
import RNFetchBlob from 'react-native-fetch-blob';
import ReviewGallery from './Gallery';
var RNGRP = require('react-native-get-real-path');
var RNFS = require('react-native-fs');

let Card = React.createClass({

  render() {
    return (
      <Image style={styles.thumbnail} source={{uri: this.props.node.image.uri}} />
    )
  }
})

let NoMoreCards = React.createClass({
  render() {
    return (
      <ReviewGallery deletedPhotos={deletedArray}/>
    )
  }
})

let Gallery = React.createClass({

  render() {
    return (
      <Image style={styles.thumbnail} source={{uri: this.props.node.image.uri}} />
    )
  }
})

const deletedArray = [];

export default React.createClass({

  getInitialState() {
    return {
      photos: [],
      index: this.props.index,
      outOfCards: false,
      photosFound: false
    }
  },

  componentWillMount() {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All'
    }).then(res => {
      this.setState({photos: res.edges})
      this.setState({photosFound: true})
    })
  },

  handleYup (card) {
    this.state.index = this.state.index + 1
    this.props.handle(this.state.index, deletedArray)
    //console.log("Saved photo.")
  },

  handleNope (card) {
    var imageURI = this.state.photos[this.state.index].node.image.uri
    deletedArray.push({
      id: this.state.index,
      src: imageURI,
      delete: true})
    this.state.index = this.state.index + 1

    this.props.handle(this.state.index, deletedArray)
    //this.deleteImageFile(imageURI)

    //console.log("Added to delete array.")
  },

  deleteImageFile(imageURI) {

    console.log(imageURI)

    RNGRP.getRealPathFromURI(imageURI).then(filePath =>
      RNFS.unlink(filePath)
      .then(() => {
        RNFetchBlob.fs.scanFile([ { path : filePath } ])
        .then(() => {
          console.log("scan file success")
        })
        .catch((err) => {
          console.log("scan file error")
        })
        console.log('FILE DELETED');
      })
      // `unlink` will throw an error, if the item to unlink does not exist
      .catch((err) => {
        console.log(err.message);
      })
    )
  },

  render() {

    //console.log(this.state.photos)
    if (!this.state.photosFound) {
      return (
        <RippleLoader/>
      )
    }
    else {
      return (
        <SwipeCards
          cards={this.state.photos.slice(this.state.index)}
          loop={false}

          renderCard={(cardData) => <Card {...cardData} />}
          renderNoMoreCards={() => <NoMoreCards />}
          showYup={true}
          showNope={true}

          nopeText={'Delete'}
          yupText={'Save'}

          handleYup={this.handleYup}
          handleNope={this.handleNope}
        />
      )
    }
  }
})

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
  },
  thumbnail: {
    flex: 1,
    resizeMode: 'contain',
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
