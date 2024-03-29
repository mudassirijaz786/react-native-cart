import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './Login';
import Signup from './Signup';
import Test from "./Test"
import SimpleMap from "./SimpleMap"
import Maps from "./Maps"
import Map from "./Map"
import MapTest from "./MapTest"
export default class Routes extends Component {
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>
			      <Scene key="login" component={Login} title="Login" initial={true}/>
			      <Scene key="signup" component={Signup} title="Register"/>
				  <Scene key="test" component={Test} title="Test"/>
				  <Scene key="testBackToLogin" component={Login} title="Login"/>
				  <Scene key="simpleMap" component={SimpleMap} title="simplemap"/>
				  <Scene key="maps" component={Maps} title="maps"/>
				  <Scene key="map" component={Map} title="map"/>
				  <Scene key="maptest" component={MapTest} title="maptest"/>

			    </Stack>
			 </Router>
			)
	}
}