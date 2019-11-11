import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Home from "./Home"
import Tags from "./Tags"
import ElectronicsScreen from './ElectronicsScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import ShowCart from "./ShowCart"

export default class RouteCart extends Component {
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={false}>
			      <Scene key="home" component={Home} title="Home" initial={true}/>
                  <Scene key="tags" component={ElectronicsScreen} title="tags" />
                  <Scene key="show" component={ShowCart} title="Your saved Locations" />
			    </Stack>
			 </Router>
                
            
			)
	}
}