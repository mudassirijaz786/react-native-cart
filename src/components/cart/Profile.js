import React, { Component } from 'react'
import {Button } from "react-native-paper"
import { Text, View, AsyncStorage, StyleSheet, Image,TextInput, ActivityIndicator, Alert,TouchableOpacity, PixelRatio} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Formik } from 'formik';
import * as yup from 'yup';
import ImagePicker from 'react-native-image-picker';

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
   
  });

export class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            newName: '',
            avatarSource: null,
            imageReplaced: false,
            inputFieldHideShow: false,
        }
        this.getUsernameFromLogin()
        this.getUsernameFromEdit()
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
      }
  
      async getUsernameFromLogin(){
        try {
            const name = await AsyncStorage.getItem('name');
            // const newName = await AsyncStorage.getItem('newName')
            console.log("Name in Profile page", name)
            // console.log("New Name in Profile page", newName)

            this.setState({              
                name: name,   
                // newName: newName          
            });

        } 
        catch (error) {
            console.log("Error retrieving data" + error);
        }
    }
    async getUsernameFromEdit() {
        try {
            const name = await AsyncStorage.getItem('new');
            // const newName = await AsyncStorage.getItem('newName')
            console.log("New in Profile page", name)
            // console.log("New Name in Profile page", newName)

            this.setState({              
                newName: newName,   
                // newName: newName          
            });

        } 
        catch (error) {
            console.log("Error retrieving data" + error);
        }
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
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            let source = {uri: response.uri};
    
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
            this.setState({
              avatarSource: source,
              imageReplaced: false
            });
          }
        });
      }
    async handleSubmit(values) {
        // console.log("dsdsd",this)
        // const arr=JSON.stringify(values);
        // Alert.alert(arr)
        // console.log("arr",arr)
        // console.log("Username",values.name)
        const name = await AsyncStorage.getItem('name', values.name);
        this.setState({
            name: name
        })
        console.log("HHH")
        // console.log("Get", name)
        // Alert.alert(store)
        // this.toHome()
        return true;
        // if(store){
        // Keyboard.dismiss()
        // this.simplemapping()
  
  
        //   this.test()
        // }
        // const c = await AsyncStorage.getItem('array')
        // console.log("get item", c)
      }
      editUsername(){
          console.log(".gfgdfgdfgg");

          this.setState({              
            inputFieldHideShow: true
          //  name: name,   
            // newName: newName          
        });

          console.log("after")

      }
      saveUsername(){
          console.log("Saved ")
      }
    render() {
        return (
            <View style={styles.container}>
                 
                 <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View
            style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
            {this.state.avatarSource === null ? (
                <View>
                <Text style={{marginLeft: 15}}>Select Image</Text>
                <Image
                    style={{width: 50, height: 50, margin: 30}}
                    source={require('../../../assets/profile.png')}
                />
                </View>
            ) : (
              <Image style={styles.avatar} source={this.state.avatarSource} />
            )}
          </View>
        </TouchableOpacity>
                {/* <Button></Button> */}
               
       
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
                    <StyledInput 
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
                  <Text style={styles.smallText}> Your Name</Text>
                  <Text>{this.state.name}</Text>

                <Button  color="white" style={styles.buttonMenu}  onPress={this.editUsername.bind(this)}>Edit</Button>
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
        // justifyContent: 'center',
        alignItems: 'center',

  
  },

      avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
    titleText: {
        fontSize: 25,
        marginTop : 30
    },
    smallText: {
        fontSize: 15,
        marginTop : 30
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
export default Profile
