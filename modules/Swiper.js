'use strict';

import React from 'react';
import {StyleSheet, Text, View, Image, CameraRoll} from 'react-native';


import SwipeCards from 'react-native-swipe-cards';

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
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    )
  }
})

const Cards = [
  {name: '1', image: 'bigboy'},
  {name: '2', image: 'camera'},
  {name: '3', image: 'friends'},
  {name: '4', image: 'peppers'},
  {name: '5', image: 'rice'},
  {name: '6', image: 'stairs'},
  {name: '7', image: 'test'},
  {name: '8', image: 'https://media.giphy.com/media/hEwST9KM0UGti/giphy.gif'},
  {name: '9', image: 'https://media.giphy.com/media/3oEduJbDtIuA2VrtS0/giphy.gif'},
]

const Cards2 = [
  {name: '10', image: 'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif'},
  {name: '11', image: 'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif'},
  {name: '12', image: 'https://media4.giphy.com/media/AA69fOAMCPa4o/200.gif'},
  {name: '13', image: 'https://media.giphy.com/media/OVHFny0I7njuU/giphy.gif'},
]

const photoLib = [];

export default React.createClass({

  getInitialState() {
    return {
      photos: [],
      cards: Cards,
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
    console.log("Saved photo.")
  },

  handleNope (card) {
    console.log("Added to delete array.")
  },

  cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      if (!this.state.outOfCards) {
        console.log(`Adding ${Cards2.length} more cards`)

        this.setState({
          cards: this.state.cards.concat(Cards2),
          outOfCards: true
        })
      }
    }

  },

  render() {

    console.log(this.state.photos)
    if (!this.state.photosFound) {
      return (
        <Text>Loading</Text>
      )
    }
    else {
      return (
        <SwipeCards
          cards={this.state.photos}
          loop={false}

          renderCard={(cardData) => <Card {...cardData} />}
          renderNoMoreCards={() => <NoMoreCards />}
          showYup={true}
          showNope={true}

          nopeText={'Delete'}
          yupText={'Save'}

          handleYup={this.handleYup}
          handleNope={this.handleNope}
          cardRemoved={this.cardRemoved}
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
  }
})
