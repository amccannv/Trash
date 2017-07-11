import React, { Component } from 'react';
import PhotoGrid from 'react-native-photo-grid';
import { View, Image, TouchableOpacity, Text, StyleSheet }from 'react-native';
import { CheckBox } from 'react-native-elements'

class ReviewImage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //deletedArray: this.props.deletedArray,
      checked: this.props.currentItem.delete,
    };
  }

  componentDidMount() {
    console.log(this.props.currentItem)
  }

  render() {
    return(
      <CheckBox
        style = {styles.checkbox}
        containerStyle = {{
          backgroundColor: 'rgba(0,0,0,0)',
        }}
        checkedIcon = 'dot-circle-o'
        uncheckedIcon = 'circle-o'
        checked = {this.state.checked}
        onPress = { () => {
          this.setState({
            checked: !this.state.checked
          });
          this.props.handle(this.props.currentItem)
        }}
      />
    );
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
});


export default ReviewImage;
