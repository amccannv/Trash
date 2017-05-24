'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, CameraRoll, ScrollView} from 'react-native';

class CameraRollProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
     images: [],
     isCameraLoaded: false
    };
  }

  componentWillMount() {
    CameraRoll.getPhotos({first: 5}).then(
      (data) =>{
        const assets = data.edges;
        const images = assets.map((asset) => asset.node.image);
        this.setState({
          isCameraLoaded: true,
          images: images
        })
      },
      (error) => {
        console.warn(error);
      }
    );
  }

  render() {
      if (!this.state.isCameraLoaded) {
        return (
          <View>
            <Text>Loading ...</Text>
          </View>
          );
      }
      return (
        <ScrollView style={styles.container}>
          <View style={styles.imageGrid}>
            { this.state.images.map((image) => <Image key={image.uri} style={styles.image} source={{ uri: image.uri }} />) }
          </View>
        </ScrollView>
      );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  header: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 0.5,
    backgroundColor: '#FCFCFC',
  },
  headerText: {
    fontFamily: 'LemonMilklight',
    fontSize: 20,
    color: '#757575',
  },
  photo: {
    flex: 5,
    backgroundColor: '#FCFCFC',
  },
  actionBar: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  trashButton: {
    alignItems:'center',
    justifyContent:'center',
    paddingLeft: 50,
    width:100,
    height:100,
    backgroundColor:'#FCFCFC',
    borderRadius:100,
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
  buttonText: {
    fontFamily: 'LemonMilklight',
    fontSize: 15,
  },
});

export default CameraRollProject;
