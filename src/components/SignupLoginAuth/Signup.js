import React from 'react';
import {
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  View,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  Keyboard,
  StyleSheet
} from 'react-native';
import {Button} from "react-native-paper"
import { Formik } from 'formik';
import * as yup from 'yup';
import {Actions} from 'react-native-router-flux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const FieldWrapper = ({ children, label, formikProps, formikKey }) => (
  <View style={{ marginHorizontal: 20, marginVertical: 3 }}>
    <Text style={{ marginBottom: 3 }}>{label}</Text>
    {children}
    <Text style={{ color: 'red' }}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

const StyledInput = ({ label, formikProps, formikKey, ...rest }) => {
  const inputStyles = {
    borderWidth: 2,
    borderColor: 'indigo',
    // padding: 10,
    marginBottom: -5,
    marginTop: -1,
    height: hp('7%'), // 70% of height device screen
    width: wp('84%'),
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
  firstname: yup
  .string()
  .label('firstname')
  .required(),
  // .min(5, 'username cannnot be <= 2')
  // .max(15, 'please enter a username =< 15'),
  lastname: yup
  .string()
  .label('lastname')
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
    .min(6, 'password should be greater than 6'),
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
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          confirmPassword: '',
          errorMsgSignup: ''
      }
    }
    async signupCall(JsonObj) {
      const url = 'https://space-rental.herokuapp.com/users/create_user';
      try {
          const response = await fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(JsonObj), // data can be `string` or {object}!
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const json = await response.json();
          console.log('Results:', JSON.stringify(json));
          if(!json.success){
            console.log("THERE IS ERROR")
            this.setState({
              errorMsgSignup: `email ${json.user.email}`,
            })
          }else{
            this.goLogin()
          }
      } 
      catch (error) {
          console.error('Error:', error);
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
    goLogin(){
      Actions.login()
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

  //   async saveKey(email , password) {
  //     try {
  //         await AsyncStorage.setItem("name", email );
  //         await AsyncStorage.setItem('password', password );
  //     } 
  //     catch (error) {
  //         console.log("Error saving data" + error);
  //     }
  // }
    async handleSubmit(values) {
      // console.log("dsdsd",this)
      // const arr=JSON.stringify(values);
      // Alert.alert(arr)
      // console.log("arr",arr)
      // console.log("Username",values.name)
              //  await AsyncStorage.setItem('name',values.name);
              // await AsyncStorage.setItem('password',values.password);

      // console.log("Get", name)
      // Alert.alert(store)
                  // this.goLogin()
                    // return true;
      // if(store){
      // Keyboard.dismiss()
      // this.simplemapping()
      if (values){
        // this.saveKey(values.email ,  values.password);

            //creating obj with same keys for API call
            var obj = {};
            obj["first_name"] = values.firstname;
            obj["last_name"] = values.lastname;
            obj["email"] = values.email;
            obj["password"] = values.password;
            obj["password_confirmation"]= values.confirmPassword
            this.signupCall(obj);
            console.log("obj",obj)
            // this.props.onSignInPress();
      } 
     
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
            <SafeAreaView style={styles.container}>
              
                {/* <Text style={{fontSize: 30, textAlign: "center"}}>Signup</Text> */}
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
                        <Text style={styles.error}>{this.state.errorMsgSignup}</Text>
                      <StyledInput 
                          label="firstname"
                          formikProps={formikProps}
                          formikKey="firstname"
                          placeholder="  First name"
                          // autoFocus
                          // onChange={this.handlerName}
                          // onChangeText={(name) => this.setState({ name })}

                      />
                        <StyledInput 
                          label="lastname"
                          formikProps={formikProps}
                          formikKey="lastname"
                          placeholder="  Last name"
                          // autoFocus
                          // onChange={this.handlerName}
                          // onChangeText={(name) => this.setState({ name })}

                      />
                      <StyledInput 
                          label="Email"
                          formikProps={formikProps}
                          formikKey="email"
                          placeholder="  Email"
                          // autoFocus
                          // onChange={this.handlerEmail}
                          // onChangeText={(email) => this.setState({ email })}

                      />

                      <StyledInput
                          label="Password"
                          formikProps={formikProps}
                          formikKey="password"
                          placeholder="  Password"
                          secureTextEntry
                          // onChange={this.handlerPassword}
                          // onChangeText={(password) => this.setState({ password })}

                      />

                      <StyledInput 
                          label="Confirm Password"
                          formikProps={formikProps}
                          formikKey="confirmPassword"
                          placeholder="  Confirm password"
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
                          <Button  color="white" style={styles.buttonMenu}  onPress={formikProps.handleSubmit} >Signup</Button>
                          
                          // <Button title="Submit" onPress={this.onSubmitHandler.bind(this)} />

                      )}
                      <Text style={styles.info}>Have an account?</Text>
                      <TouchableOpacity style={styles.info} onPress={this.goLogin}><Text>Click here to Login</Text></TouchableOpacity>

                      </React.Fragment>
                  )}
                </Formik>
            </SafeAreaView>
        )
    }
  
}
const styles = StyleSheet.create ({

  container: {
   
    flex: 1,
    alignContent: "center",
    marginTop: 5
},
  boldText: {
     fontSize: 30,
     color: 'red',
  },
  inputField:{
    // height: "10%",
    // // backgroundColor: "blue",
    // borderWidth: 2,
    // borderColor: "green",
    // marginBottom: -5,
    // marginTop: -8
  },
  boldText: {
    fontSize: 30,
    color: 'red',
 },
 
 textWrapper: {
   height: hp('10%'), // 70% of height device screen
   width: wp('100%'),   // 80% of width device screen
   backgroundColor: "blue"
 },
 myText: {
   fontSize: hp('5%') // End result looks like the provided UI mockup
 },
 info: {
  marginLeft: 20,
  marginTop: 5
},
buttonMenu:{
  backgroundColor: "indigo",
  marginBottom: 10,
  width: wp("40%"),
  marginLeft: 20,
  
},
error:{
  color: "red"
}
});