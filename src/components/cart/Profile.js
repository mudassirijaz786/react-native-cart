import React, { Component } from 'react'
import {Button } from "react-native-paper"
import { Text, View, AsyncStorage, StyleSheet, Image,TextInput, ActivityIndicator, Alert,TouchableOpacity, PixelRatio} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Formik } from 'formik';
import * as yup from 'yup';
import ImagePicker from 'react-native-image-picker';
import { bindActionCreators } from 'redux';


import { connect } from 'react-redux';
import {userDetail} from "../../redux/actions/userDetail"

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
    //   borderRadius: 2,
      borderColor: 'indigo',
      // padding: 10,
      marginBottom: -3,
      marginTop: 1,
      height: hp('8%'), // 70% of height device screen
      width: wp('30%'),
      
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

  const validationSchema = yup.object().shape({
      name: yup
          .string()
          .label('Username')
          .required(), 
  });

export class Profile extends Component {
    constructor(props){
        super(props);

        this.state = {
            avatarSource: null,
            inputFieldHideShow: false,
            photo: null
        }

 
        this.handleUploadPhoto = this.handleUploadPhoto.bind(this);
      }

      componentDidMount(){
        const {user} = this.props
        const sourceImage = {uri: user[0].image_url}
        this.setState({
          avatarSource: sourceImage,
        })
      }

     

    handleUploadPhoto() {
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
      
      if(pic === null){
        Object.keys(body).forEach(key => {
          data.append(key, body[key]);
        });
        return data;
      }
      else {
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
      }
    };

    async EditUserApiCall(photo , otherParams) {
      console.log("responce of picture :" , photo );
      console.log("object is   " , otherParams);
      const url = 'https://space-rental.herokuapp.com/users/edit_user_call';

      try {
          const response = await fetch(url, {
            method: 'POST', // or 'PUT'
            // body: JSON.stringify(JsonObj), // data can be `string` or {object}!
            body: this.createFormData(photo, otherParams),
          });

          const json = await response.json();
          console.log("Edited responce is: ", JSON.stringify(json));
          // alert("Edited successfully!");

          this.props.userDetail(json);
          console.log('state saved is  :', this.props.user[0]);

      } 
      catch (error) {
          console.error('Error:', error);
          alert("Upload failed!");
      }
    }

    handleSubmit(values) {
        
      if (values){
        console.log("values are   " , values);
        //creating obj with same keys for API call
        const {user} = this.props
        let obj = {};
      
        obj["id"] = user[0].id;
        obj["first_name"] = values.name;
        obj["last_name"] = user[0].last_name;
        
        this.EditUserApiCall(this.state.photo , obj);
      } 
    }

    editUsername(){
        this.setState({              
          inputFieldHideShow: true  
        });
    }

    saveUsername(){
        console.log("Saved ")
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.info}> first name: {this.props.user[0].first_name} </Text>
                 <TouchableOpacity onPress={this.handleUploadPhoto.bind(this)}>
                      <View
                        style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                        {this.state.avatarSource === null ? (
                            <View>
                            <Text style={{marginLeft: 15}}>Select Photo</Text>
                            <Image
                                style={{width: 50, height: 50, margin: 30}}
                                source={require('../../../assets/menu.png')}
                            />
                            </View>
                        ) : (
                          <Image style={styles.avatar} source={this.state.avatarSource} />
                        )}
                      </View>
                  </TouchableOpacity>

        <View
            style={{marginBottom: 20}}>
            {this.state.inputFieldHideShow === true ? (
                <Formik
                initialValues={this.state}
            
                onSubmit={this.handleSubmit.bind(this)}

                validationSchema={validationSchema}
                >
                {formikProps => (
                    <React.Fragment>
                    <StyledInput style={styles.inputField}
                        label="Your Name"
                        formikProps={formikProps}
                        formikKey="name"
                        placeholder="  New Username"
                    

                    />
                

                    {formikProps.isSubmitting ? (
                        <ActivityIndicator />
                    ) : (
                    <Button  color="white" style={styles.save}  onPress={formikProps.handleSubmit}>Save</Button>
                    


                    )}
    
    
                    </React.Fragment>
                )}
                </Formik>
            ) : (
                <View>
                  <Text style={styles.usernameText}> Your First Name</Text>
                  <Text style={styles.name}>{this.props.user[0].first_name}</Text>

                <Button  style={styles.editButton} color="white" style={styles.buttonMenu}  onPress={this.editUsername.bind(this)}>Edit</Button>
                </View>

            )}
          </View>
             
            </View>
        )
    }
}

const styles = StyleSheet.create ({

    container: {

        flex: 1,
        marginTop: 50,
        alignItems: 'center',

  
  },

  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernameText: {
   fontSize: 15,
  },
  inputField:{
    borderBottomColor: "indigo",
    marginBottom: -10,
    height: hp('8%'), // 70% of height device screen
    width: wp('40%'),
  },
  editButton:{
    marginTop: 20,

  },
    titleText: {
        fontSize: 25,
        marginTop : 30
    },
    smallText: {
        fontSize: 15,
        marginTop : 30
    },
    name: {
      fontSize: 20
    },
    buttonMenu:{
      backgroundColor: "indigo",
      marginTop: 10,
      width: wp("40%"),
      marginLeft: 20,

    },
    save:{
        backgroundColor: "indigo",
        width: wp("40%"),
        marginLeft: 20,
  
      },
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150,
      },
  });



const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  userDetail: payload => userDetail(payload)
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Profile);