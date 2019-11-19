import React from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  ActivityIndicator,
  View,
  Text,
  Switch,
  TouchableOpacity,
  AsyncStorage,
  Keyboard,
  Alert
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import {Actions} from 'react-native-router-flux';
import Test from "./Test"
const FieldWrapper = ({ children, label, formikProps, formikKey }) => (
  <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
    <Text style={{ marginBottom: 3 }}>{label}</Text>
    {children}
    <Text style={{ color: 'red' }}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

const StyledInput = ({ label, formikProps, formikKey, ...rest }) => {
  const inputStyles = {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 3,
  };

  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyles.borderColor = 'red';
  }

  return (
    <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
      <TextInput
        style={inputStyles}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </FieldWrapper>
  );
};

const StyledSwitch = ({ formikKey, formikProps, label, ...rest }) => (
  <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
    <Switch
      value={formikProps.values[formikKey]}
      onValueChange={value => {
        formikProps.setFieldValue(formikKey, value);
      }}
      {...rest}
    />
  </FieldWrapper>
);

const validationSchema = yup.object().shape({
    name: yup
        .string()
        .label('Username')
        .required(),
    // .min(5, 'username cannnot be <= 2')
    // .max(15, 'please enter a username =< 15'),
    // email: yup
    //     .string()
    //     .label('Email')
    //     .email()
    //     .required(),
    password: yup
        .string()
        .label('Password')
        .required()
        .min(5, 'password should be greater than 5'),
        // .max(15, 'password cannot be >= 15'),
    // confirmPassword: yup
    //     .string()
    //     .required()
    //     // .oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
    //     // .required('Confirm Password is required')
    //     .label('Confirm password')
    //     .test('passwords-match', 'Passwords must match', function(value) {
    //     return this.parent.password === value;
    //     }),
//   agreeToTerms: yup
//     .boolean()
//     .label('Terms')
//     .test(
//       'is-true',
//       'Must agree to terms to continue',
//       value => value === true
//     ),
});

export default class LoginTest extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          name: '',
          password: '',
      }
    }

    render(){
      
        return(
            <SafeAreaView style={{ marginTop: 90 }}>
                <Text style={{fontSize: 30, textAlign: "center"}}>Login</Text>
                <Text style={{ textAlign: "center"}}>Enter mudassir in both fields</Text>
                <Formik
                initialValues={this.state}
              
                onSubmit={(values, actions) => {
                    alert(JSON.stringify(values));
                    console.log(values)
                    setTimeout(() => {
                    actions.setSubmitting(false);
                    }, 1000);
                }}
                validationSchema={validationSchema}
                >
                {formikProps => (
                    <React.Fragment>
                    <StyledInput
                        label="name"
                        formikProps={formikProps}
                        formikKey="name"
                        placeholder="Username"
                        onChangeText={(name) => this.setState({ name })}

                    />
                
                    <StyledInput
                        label="Password"
                        formikProps={formikProps}
                        formikKey="password"
                        placeholder="password"
                        secureTsecureTextEntryextEntry
                        onChangeText={(password) => this.setState({ password })}

                    />

                  

                    {formikProps.isSubmitting ? (
                        <ActivityIndicator />
                    ) : (
                       
                        
                         <Button title="Submit" onPress={this.onLogin.bind(this)} />



                    )}
                    <Text>Already have an account?</Text>
                    <TouchableOpacity onPress={this.signup}><Text> Signup</Text></TouchableOpacity>

                    </React.Fragment>
                )}
                </Formik>
            </SafeAreaView>
        )
    }
  
}
