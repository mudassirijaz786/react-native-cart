import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import ValidationComponent from 'react-native-form-validator';

import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;



// const USERNAME = t.refinement(t.String, function (n) { 
//     return n == 5; 
// })
// USERNAME.getValidationErrorMessage = function (value, path, context){
//     return "username should be greater than 2"
// }
const Email = t.refinement(t.String, email => {
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
    return reg.test(email);
});
const User = t.struct({
    // email: t.String,
    email: Email,
    //username: t.maybe(t.String),
    username: t.String,
  
    password: t.String,
});
const options = {
    fields: {
        username: {
            placeholder: "username",
            error: 'username cannot be empty',
            // help: "username that is unique in our database"
        },
        email: {
            placeholder: "email",
            error: 'email cannot be empty',
        },
        password: {
            placeholder: "password",
            // help: "please enter a 8 characters longs password",
            error: 'password cannot be empty'
        },
    },
  };
export default class SignupAuth extends Component {
    handleSubmit = () => {
        const value = this._form.getValue(); 
        console.log('value: ', value);
    }
    render() {
        return (
        <View style={styles.container}>
            <Form    
                ref={c => this._form = c} 
                type={User} 
                options = {options}
            /> 
            <Button
                title="Sign Up!"
                onPress={this.handleSubmit}
            />
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});