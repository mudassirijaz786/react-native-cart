import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Button
} from 'react-native';
import {Actions} from 'react-native-router-flux';

const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

import Home from "../cart/Home"
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class Menu extends React.Component {


    loginScreen(){
        console.log("button pressed")
        Actions.home()
    }
    render(){
        return (
            <ScrollView scrollsToTop={false} style={styles.menu}>
              <View style={styles.avatarContainer}>
                <Image
                  style={styles.avatar}
                  source={{ uri }}
                />
                <Text style={styles.name}>Listing Application</Text>
              </View>
        

        
              <Text onPress={this.loginScreen}
                style={styles.item}>
                    loginScreen
              </Text>
              
            </ScrollView>
          );
    }
  
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
    menu: {
      flex: 1,
      width: window.width,
      height: window.height,
      backgroundColor: 'gray',
      padding: 20,
    },
    avatarContainer: {
      marginBottom: 20,
      marginTop: 20,
    },
    button:{
        width: 40
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      flex: 1,
    },
    name: {
      position: 'absolute',
      left: 70,
      top: 20,
    },
    item: {
      fontSize: 14,
      fontWeight: '300',
      paddingTop: 5,
    },
  });