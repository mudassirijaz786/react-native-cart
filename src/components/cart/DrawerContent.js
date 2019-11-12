import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-paper';
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
                    <Button style={styles.buttonMenu} onPress={this.goHome}>Home</Button>
                    <Button style={styles.buttonMenu} onPress={this.goLogin}>Login</Button>
                    <Button style={styles.buttonMenu} onPress={this.goSignup}>Signup</Button>
                    <Button style={styles.buttonMenu} onPress={this.goCart}>Your Saved locations</Button>
                    <Button style={styles.buttonMenu} onPress={this.goAvailible}>Availible locations</Button>
                </View>
            </View>
            );
            }
          
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333'
    },
    drawerText: {
        color: '#fff'
    },
    topDrawer: {
        flex: 1,
        backgroundColor: 'purple',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    bottomDrawer: {
        flex: 4,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    buttonMenu:{
        backgroundColor: "#d0d4ab",
        marginBottom: 5,
        color: "orange"
    }
});