import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class DrawerContent extends React.Component {
    goHome(){
        Actions.home()
    }
    goLogin(){
        Actions.login()
    }
    goSignup(){
        Actions.signup()
    }
    goCart(){
        Actions.show()
    }
    goAvailible(){
        Actions.tags()
    }
    render(){
        return (
            <View style={ styles.container }>
                <View style={styles.topDrawer}>
                    <Text style={styles.drawerText}>Location Saving Application</Text>
                </View>
                <View style={styles.bottomDrawer}>
                    <Button color="white" style={styles.buttonMenu} onPress={this.goHome}>Home</Button>
                    <Button color="white" style={styles.buttonMenu} onPress={this.goLogin}>Login</Button>
                    <Button color="white" style={styles.buttonMenu} onPress={this.goSignup}>Signup</Button>
                    <Button color="white" style={styles.buttonMenu} onPress={this.goCart}>Saved</Button>
                    <Button color="white" style={styles.buttonMenu} onPress={this.goAvailible}>Availible</Button>

                </View>
            </View>
            );
            }
          
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'indigo',
    },
    drawerText: {
        color: '#fff'
    },
    topDrawer: {
        flex: 1,
        backgroundColor: 'indigo',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        // height: hp('100%'), // 70% of height device screen
        width: wp('76%'),
        
    },
    bottomDrawer: {
        flex: 4,
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    buttonMenu:{
        backgroundColor: "indigo",
        marginBottom: 10,
        color: "orange",
        // height: hp('6%'), // 70% of height device screen
        width: wp('45%'),
    }
});