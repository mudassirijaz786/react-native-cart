import React, { Component } from 'react';
import {Router, Stack, Scene, Drawer, SideMenu} from 'react-native-router-flux';
import Home from "./Home"
import Tags from "./Tags"
import ElectronicsScreen from './ElectronicsScreen';
// import Icon from 'react-native-vector-icons/FontAwesome';
import ShowCart from "./ShowCart"
import Login from "../SignupLoginAuth/Login"
import Signup from "../SignupLoginAuth/Signup"
import DrawerContent from './DrawerContent';

export default class RouteCart extends Component {
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={false}>
				  <Drawer
					hideNavBar
					key="drawerMenu"
					contentComponent={DrawerContent}
					drawerWidth={300}
					drawerPosition="left"
				>	
				  <Scene key="home" component={Home} title="Home" />
                  <Scene key="tags" component={ElectronicsScreen} title="tags" />
                  <Scene key="show" component={ShowCart} title="Your saved Locations" />
				  <Scene key="login" component={Login} title="Login" initial={true}/>
				  <Scene key="signup" component={Signup} title="Signup"/>

            </Drawer>
			    </Stack>
				
			 </Router>
                
            
			)
	}
}