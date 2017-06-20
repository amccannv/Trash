import React, { Component } from 'react';
import PhotoGrid from 'react-native-photo-grid';
import { Image, TouchableOpacity, Text }from 'react-native';

class BestGrid extends React.Component {

  constructor() {
    super();
    this.state = { items: [] };
  }

  componentDidMount() {
    let items = Array.apply(null, Array(this.props.deletedPhotos.length)).map((v, i) => {
      return { id: i, src: this.props.deletedPhotos[i] }
    });
    this.setState({ items });
  }

  render() {
    return(
      <PhotoGrid
        data = { this.state.items }
        itemsPerRow = { 3 }
        itemMargin = { 1 }
        //renderHeader = {this.renderHeader}
        renderItem = { this.renderItem }
      />
    );
  }

  renderHeader() {
    return(
      <Text>I'm on top!</Text>
    );
  }

  renderItem(item, itemSize) {
    return(
      <TouchableOpacity
        key = { item.id }
        style = {{ width: itemSize, height: itemSize }}
        onPress = { () => {
          // Do Something
        }}>
        <Image
          resizeMode = "cover"
          style = {{ flex: 1 }}
          source = {{ uri: item.src }}
        />
      </TouchableOpacity>
    )
  }

}

export default BestGrid;
