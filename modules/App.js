import React from 'react';
import { Button, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import SampleText from './SampleText';

const ReadyScreen = ({ navigation, banner }) => (
  <ScrollView>
    <SampleText>{banner}</SampleText>
    <Button
      onPress={() => navigation.navigate('Profile', { name: 'Jane' })}
      title="Go to a profile screen"
    />
    <Button
      onPress={() => navigation.navigate('Photos', { name: 'Jane' })}
      title="Go to a photos screen"
    />
    <Button onPress={() => navigation.goBack(null)} title="Go back" />
  </ScrollView>
);

const ReviewScreen = ({ navigation }) => (
  <MyNavScreen banner="Home Screen" navigation={navigation} />
);
ReviewScreen.navigationOptions = {
  title: 'Welcome',
};

const SwipeScreen = ({ navigation }) => (
  <MyNavScreen
    banner={`${navigation.state.params.name}'s Photos`}
    navigation={navigation}
  />
);
SwipeScreen.navigationOptions = {
  title: 'Photos',
};

const MyProfileScreen = ({ navigation }) => (
  <MyNavScreen
    banner={`${navigation.state.params.mode === 'edit' ? 'Now Editing ' : ''}${navigation.state.params.name}'s Profile`}
    navigation={navigation}
  />
);

const TrashStack = StackNavigator({
  Ready: {
    screen: ReadyScreen,
  },
  Swipe: {
    path: 'people/:name',
    screen: SwipeScreen,
  },
  Review: {
    path: 'photos/:name',
    screen: ReviewScreen,
  },
});

export default TrashStack;
