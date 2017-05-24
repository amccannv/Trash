import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class FullWidthImage extends Component {
    constructor() {
        super();

        this.state = {
            width: 0,
            height: 0
        };
    }

    _onLayout(event) {
        const containerWidth = event.nativeEvent.layout.width;

        Image.getSize(this.props.source, (width, height) => {
            this.setState({
                width: containerWidth,
                height: containerWidth * height / width
            });
        });
    }

    render() {
        return (
            <View onLayout={this._onLayout.bind(this)}>
                <Image
                    source={this.props.source}
                    style={{
                        width: this.state.width,
                        height: this.state.height
                    }} />
            </View>
        );
    }
}
