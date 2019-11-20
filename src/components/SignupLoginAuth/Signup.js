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
  StyleSheet,
  Image,
} from 'react-native';
import {Button} from "react-native-paper"
import { Formik } from 'formik';
import * as yup from 'yup';
import {Actions} from 'react-native-router-flux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker';


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
    marginBottom: -5,
    marginTop: -1,
    height: hp('7%'),
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
  lastname: yup
  .string()
  .label('lastname')
  .required(),
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
  confirmPassword: yup
    .string()
    .required()
    .label('Confirm password')
    .test('passwords-match', 'Passwords must match', function(value) {
      return this.parent.password === value;
    })
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
          avatarSource: null,
          photo: null,
          errorMsg: ''
      }

    }

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
    };

    simplemapping(){
      console.log("MAPPING")
      Actions.simpleMap()
    }
    goHome(){
      Actions.home()
    }

    selectPhotoTapped() {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true,
          },
        };
    
        ImagePicker.showImagePicker(options, response => {
          console.log('Response after getting picture from Camera = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          } 
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } 
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } 
          else {
            
            let source = {uri: response.uri};
      
    
            this.setState({
              avatarSource: source,
              photo: response,
            });
          }
        });
      }

      createFormData(pic, body) {
        const data = new FormData();
      
        data.append("avatar", {
          name: pic.fileName,
          type: pic.type,
          uri:
            Platform.OS === "android" ? pic.uri : pic.uri.replace("file://", "")
        });
  
  
        Object.keys(body).forEach(key => {
          data.append(key, body[key]);
        });
        
        return data;
      };
  
      async SignupApiCall(photo , otherParams) {
        console.log("responce of picture :" , photo );
        console.log("object is   " , otherParams);
        const url = 'https://space-rental.herokuapp.com/users/create_user';
  
        try {
            const response = await fetch(url, {
              method: 'POST', 
              body: this.createFormData(photo, otherParams),
            });
  
            const json = await response.json();
            console.log("Signup responce is: ", JSON.stringify(json));
            if(!json.success){
              console.log("THERE IS ERROR")
              this.setState({
                errorMsg: `email ${json.user.email}`,
              })
            }else{
              this.goLogin()
            }
  
        } 
        catch (error) {
            console.error('Error:', error);
            alert("Upload failed!");
        }
      }
      
      handleSubmit(values) {
        
        if (values){
              let obj = {};
              obj["first_name"] = values.firstname;
              obj["last_name"] = values.lastname;
              obj["email"] = values.email;
              obj["password"] = values.password;
              obj["password_confirmation"]= values.confirmPassword;

              this.SignupApiCall(this.state.photo , obj);
        } 
      }
      goLogin(){
        Actions.login()
      }

    render(){
        return(
            <SafeAreaView style={styles.container}>
              
                <Formik 
                  initialValues={this.state}
    
                  onSubmit={this.handleSubmit.bind(this)}

                  validationSchema={validationSchema}
                  >
                  {formikProps => (
                      <React.Fragment>
                      <Text style={styles.error}>{this.state.errorMsg}</Text>

                      <StyledInput 
                          label="firstname"
                          formikProps={formikProps}
                          formikKey="firstname"
                          placeholder="  First name"
                       

                      />
                        <StyledInput 
                          label="lastname"
                          formikProps={formikProps}
                          formikKey="lastname"
                          placeholder="  Last name"
   
                      />
                      <StyledInput 
                          label="Email"
                          formikProps={formikProps}
                          formikKey="email"
                          placeholder="  Email"

                      />

                      <StyledInput
                          label="Password"
                          formikProps={formikProps}
                          formikKey="password"
                          placeholder="  Password"
                          secureTextEntry

                      />

                      <StyledInput 
                          label="Confirm Password"
                          formikProps={formikProps}
                          formikKey="confirmPassword"
                          placeholder="  Confirm password"
                          secureTextEntry
           
                      />

                      <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                            <View
                              style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                              {this.state.avatarSource === null ? (
                                  <View>
                                  <Text style={{marginLeft: 15}}>Select Photo</Text>
                               
                                  </View>
                              ) : (
                                <Image style={styles.avatar} source={this.state.avatarSource} />
                              )}
                            </View>
                        </TouchableOpacity>

                      {formikProps.isSubmitting ? (
                          <ActivityIndicator />
                      ) : (
                          <Button  color="white" style={styles.buttonMenu}  onPress={formikProps.handleSubmit} >Signup</Button>
             
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

  boldText: {
    fontSize: 30,
    color: 'red',
 },
 
 textWrapper: {
   height: hp('10%'), 
   width: wp('100%'),   
   backgroundColor: "blue"
 },
 myText: {
   fontSize: hp('5%') 
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
  color: "red",
  marginLeft: 20
}
});