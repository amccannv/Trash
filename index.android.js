import React, { Component } from 'react';
import Swiper from './modules/Swiper';
import TrashStack from './modules/App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';

// console.log = function () {};
// console.info = function () {};
// console.warn = function () {};
// console.error = function () {}
// console.debug = function () {}

export default class Trash extends Component {
  render() {
    return (
      <TrashStack />
    );
  }
}

// let cardInd = 0;
//
// export default class Trash extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <StatusBar
//           backgroundColor='#D0D0D0'
//         />
//         <View style={styles.header}>
//           <Text style={styles.headerText}>Trash</Text>
//         </View>
//         <View style={styles.photo}>
//           <Swiper style={{flex: 1}} />
//         </View>
//         <View style={styles.actionBar}>
//           <TouchableOpacity style={styles.trashButton}>
//             <Icon name='delete-variant' color='#757575' size={50}/>
//             <Text style={styles.buttonText}>Delete</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.saveButton}>
//             <Icon name='heart-outline' color='#FF5252' size={50}/>
//             <Text style={styles.buttonText}>Save</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FCFCFC',
//   },
//   header: {
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     flex: 0.5,
//     backgroundColor: '#FCFCFC',
//   },
//   headerText: {
//     fontFamily: 'LemonMilklight',
//     fontSize: 20,
//     color: '#757575',
//   },
//   photo: {
//     flex: 5,
//     backgroundColor: '#FCFCFC',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//   },
//   actionBar: {
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     flexDirection: 'row',
//     flex: 1,
//     backgroundColor: 'transparent',
//   },
//   trashButton: {
//     alignItems:'center',
//     justifyContent:'center',
//     paddingLeft: 50,
//     width:100,
//     height:100,
//     backgroundColor:'#FCFCFC',
//     borderRadius:100,
//   },
//   saveButton: {
//     alignItems:'center',
//     justifyContent:'center',
//     paddingRight: 50,
//     width:100,
//     height:100,
//     backgroundColor:'#FCFCFC',
//     borderRadius:100,
//   },
//   buttonText: {
//     fontFamily: 'LemonMilklight',
//     fontSize: 15,
//   },
// });

AppRegistry.registerComponent('Trash', () => Trash);
