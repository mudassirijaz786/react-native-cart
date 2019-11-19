import React from 'react';
import {
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  View,
  Text,
  Switch,
  TouchableOpacity,
  AsyncStorage,
  Keyboard,
  Alert,
  StyleSheet
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import {Actions} from 'react-native-router-flux';
import Test from "./Test"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Button } from 'react-native-paper';

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
    borderWidth: 2,
    borderColor: 'indigo',
    // padding: 10,
    marginBottom: -3,
    marginTop: 1,
    height: hp('8%'), 
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
    name: yup
        .string()
        .label('Username')
        .required(),
   
    password: yup
        .string()
        .label('Password')
        .required()
        .min(5, 'password should be greater than 5'),
     
});


export default class Login extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          name: '',
          password: '',
      }
      this.gettingLoginInformation()
    }
    async handleSubmit(values) {
     
      console.log("Username",values.name)
      await AsyncStorage.setItem('name',values.name);
      await AsyncStorage.setItem('password',values.password);

    
      this.goLogin()
      return true;
    
    }
    async gettingLoginInformation() {
      try {
          const name = await AsyncStorage.getItem('name');
          const password = await AsyncStorage.getItem('password');
          console.log("login name", name)
          console.log("login password", password)

          this.setState({  
                  name: name,
                  password: password
          });

      } 
      catch (error) {
          console.log("Error retrieving data" + error);
      }
  }

    onLogin() {
        const { name, password } = this.state;
        if (name === this.gettingLoginInformation.name && password ===this.gettingLoginInformation.password){
         
            this.toHome()
        }else{
          Alert.alert(
            'Wrong Credential',
            'Please fill in all fields correctly',
          );
        }
        
      }
    toHome(){
      Actions.home()
    }
    test() {
	  	Actions.test()
    }
    simplemapping(){
      Actions.simpleMap()
    }
    maps(){
      Actions.maps()
    }
    maptest(){
      Actions.maptest()
    }
    map(){
      Actions.map()
    }
    signup(){
      Actions.signup()
    }
    render(){
      // const {name} = this.state
      // console.log(name)
        return(
            <SafeAreaView style={styles.container}>
                {/* <View style={styles.textWrapper}>
                <Text style={styles.myText}>Login</Text>

                </View> */}
                
                <Text style={{ textAlign: "center"}}>Please enter "testuser" in both fields</Text>
                <Formik
                initialValues={this.state}
                // initialValues={{
                //   name: '',
                //   email: '',
                //   password: '',
                //   confirmPassword: ''
                // }}
                onSubmit={(values, actions) => {
                    alert(JSON.stringify(values));
                    console.log(values)
                    setTimeout(() => {
                    actions.setSubmitting(false);
                    }, 1000);
                }}
                // validationSchema={validationSchema}
                >
                {formikProps => (
                    <React.Fragment>
                    <StyledInput 
                        label="Username"
                        formikProps={formikProps}
                        formikKey="name"
                        placeholder="  Username"
                        // autoFocus
                        onChangeText={(name) => this.setState({ name })}
                        // value={this.state.name}

                    />
                    {/* <StyledInput
                        label="Email"
                        formikProps={formikProps}
                        formikKey="email"
                        placeholder="Email"
                        autoFocus
                    /> */}

                    <StyledInput 
                        label="Password"
                        formikProps={formikProps}
                        formikKey="password"
                        placeholder="  Password"
                        secureTsecureTextEntryextEntry
                        onChangeText={(password) => this.setState({ password })}
                        // value={this.state.password}

                    />

                    {/* <StyledInput
                        label="Confirm Password"
                        formikProps={formikProps}
                        formikKey="confirmPassword"
                        placeholder="confirm password"
                        secureTextEntry
                    /> */}

                    {/* <StyledSwitch
                        label="Agree to Terms"
                        formikKey="agreeToTerms"
                        formikProps={formikProps}
                    /> */}

                    {formikProps.isSubmitting ? (
                        <ActivityIndicator />
                    ) : (
                        // <Button title="Submit" onPress={formikProps.handleSubmit} />
                        // <Button title="Submit" onPress={this.showData()} />
                        // <Button title="Submit" onPress={this.onSubmitHandler()} />
                        
                         <Button color="white" style={styles.buttonMenu} onPress={this.onLogin.bind(this)}>Login</Button>


                    )}
                    <Text style={styles.info}>Don't have an account?</Text>
                    <TouchableOpacity style={styles.info} onPress={this.signup}><Text>Click here to Signup</Text></TouchableOpacity>

                    </React.Fragment>
                )}
                </Formik>
            </SafeAreaView>
        )
    }
  
}



const styles = StyleSheet.create ({

  container: {
  //  width: "100%",
  //  aspectRatio: 2,
  //  backgroundColor: "green",
  //  height: "100%"
  flex: 1,
  marginTop: 10

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
  // button:{
  //   width: wp("50%"),
  //   color: "blue"
  // }
  buttonMenu:{
    backgroundColor: "indigo",
    marginBottom: 10,
    width: wp("40%"),
    marginLeft: 20
  }
});