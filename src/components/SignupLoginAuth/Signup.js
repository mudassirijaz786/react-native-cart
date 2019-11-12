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
Alert,
  AsyncStorage,
  Keyboard
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import {Actions} from 'react-native-router-flux';

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
  email: yup
    .string()
    .label('Email')
    .email()
    .required(),
  password: yup
    .string()
    .label('Password')
    .required()
    .min(5, 'password should be greater than 5'),
    // .max(15, 'password cannot be >= 15'),
  confirmPassword: yup
    .string()
    .required()
    // .oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
    // .required('Confirm Password is required')
    .label('Confirm password')
    .test('passwords-match', 'Passwords must match', function(value) {
      return this.parent.password === value;
    }),
//   agreeToTerms: yup
//     .boolean()
//     .label('Terms')
//     .test(
//       'is-true',
//       'Must agree to terms to continue',
//       value => value === true
//     ),
});

export default class Signup extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
      }
    }
    
    // handlerName = (e) =>{
    //   console.log("Name", e.nativeEvent.text)
    //   this.setState({
    //     name: e.nativeEvent.text
    //   })
    // }
    // handlerEmail = (e) =>{
    //   console.log("Email", e.nativeEvent.text)
    //   this.setState({
    //     email: e.nativeEvent.text
    //   })
    // }
    // handlerPassword = (e) =>{
    //   console.log("Password", e.nativeEvent.text)
    //   this.setState({
    //     password: e.nativeEvent.text
    //   })
    // }
    // handlerPasswordConfirm = (e) =>{
    //   console.log("Password", e.nativeEvent.text)
    //   this.setState({
    //     confirmPassword: e.nativeEvent.text
    //   })
    // }

    // saveData () {
    //   const {name, email, password, confirmPassword} = this.state
    //   let array = {
    //     name: name,
    //     email: email,
    //     password: password,
    //     confirmPassword: confirmPassword
    //   }
    //   AsyncStorage.getItem('array', JSON.stringify(array))
    //   Keyboard.dismiss()
    //   alert(name + " " + email + " " + password + " " + confirmPassword + " " )
    // }
    // onSubmitHandler() {
    //   const { name, email, password, confirmPassword } = this.state;
    //       Alert.alert('Credentials', `${name} + ${email} + ${password} + ${confirmPassword}`);
    //       Keyboard.dismiss()
    //       // <Test/>
    //       console.log("Name in state", name)
    //       console.log("Email in state", email)
    //       console.log("Password in state", password)
    //       console.log("Confirm Password in state", confirmPassword)

    //       // AsyncStorage.setItem('array', JSON.stringify(array))
    // }
    test() {
	  	Actions.test()
    }
    goBack() {
      Actions.pop();
    }

    h1 = async (values, actions) => {
      alert(JSON.stringify(values))
      // try {
      //   await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
      // } catch (error) {
      //   // Error saving data
      // }
    };
    // success () {
    //   if(this.handleSubmit()){
    //     this.simplemapping()
    //   }
    // }


    async handleSubmit(values) {
      console.log("dsdsd",this)
      const arr=JSON.stringify(values);
      // Alert.alert(arr)
      const store = await AsyncStorage.setItem('array',arr);
      this.goHome()
      return true;
      // if(store){
      // Keyboard.dismiss()
      // this.simplemapping()


      //   this.test()
      // }
      // const c = await AsyncStorage.getItem('array')
      // console.log("get item", c)
    }


    simplemapping(){
      console.log("MAPPING")
      Actions.simpleMap()
    }
    goHome(){
      Actions.home()
    }
    render(){
      // const {name} = this.state
      // console.log(name)
        return(
            <SafeAreaView style={{ marginTop: 50 }}>
                <Text style={{fontSize: 30, textAlign: "center"}}>Signup</Text>
                <Formik
                  initialValues={this.state}
                  // initialValues={{
                  //   name: '',
                  //   email: '',
                  //   password: '',
                  //   confirmPassword: ''
                  // }}
                  onSubmit={this.handleSubmit.bind(this)}
                  // onSubmit={(values, actions) => {
                  //     alert(values);
                  //     console.log(values)
                  //     AsyncStorage.setItem('array', values.name)
                  //     const c = AsyncStorage.getItem('array')
                  //     console.log("get item", c)

                  //     setTimeout(() => {
                  //     actions.setSubmitting(false);
                  //     }, 1000);
                  // }}
                  validationSchema={validationSchema}
                  >
                  {formikProps => (
                      <React.Fragment>
                      <StyledInput
                          label="username"
                          formikProps={formikProps}
                          formikKey="name"
                          placeholder="Username"
                          // autoFocus
                          // onChange={this.handlerName}
                          // onChangeText={(name) => this.setState({ name })}

                      />
                      <StyledInput
                          label="Email"
                          formikProps={formikProps}
                          formikKey="email"
                          placeholder="Email"
                          // autoFocus
                          // onChange={this.handlerEmail}
                          // onChangeText={(email) => this.setState({ email })}

                      />

                      <StyledInput
                          label="Password"
                          formikProps={formikProps}
                          formikKey="password"
                          placeholder="Password"
                          secureTextEntry
                          // onChange={this.handlerPassword}
                          // onChangeText={(password) => this.setState({ password })}

                      />

                      <StyledInput
                          label="Confirm Password"
                          formikProps={formikProps}
                          formikKey="confirmPassword"
                          placeholder="Confirm password"
                          secureTextEntry
                          // onChange={this.handlerPasswordConfirm}
                          // onChangeText={(confirmPassword) => this.setState({ confirmPassword })}

                      />

                      {/* <StyledSwitch
                          label="Agree to Terms"
                          formikKey="agreeToTerms"
                          formikProps={formikProps}
                      /> */}

                      {formikProps.isSubmitting ? (
                          <ActivityIndicator />
                      ) : (
                          <Button title="Submit" onPress={formikProps.handleSubmit} />
                          
                          // <Button title="Submit" onPress={this.onSubmitHandler.bind(this)} />

                      )}
                      <Text>Have an account?</Text>
                      <TouchableOpacity onPress={this.goBack}><Text> Sign in</Text></TouchableOpacity>

                      </React.Fragment>
                  )}
                </Formik>
            </SafeAreaView>
        )
    }
  
}