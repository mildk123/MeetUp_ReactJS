import React from 'react';

import Auth from './Auth/index';
import Home from './Home/index';
import Profile from './Profile/index';
import SelectMeet from './SelectMeet/';
import Directions from './SelectMeet/Directions'


import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import MeetLocation from './SelectMeet/MeetLocation';





const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Auth} />      
            <Route  path="/Home" component={Home} />
            <Route  path="/Profile" component={Profile} />      
            <Route exact path="/SelectMeeting" component={SelectMeet} />  
            <Route exact path="/SelectMeeting/meetlocation" component={MeetLocation} />  
            <Route  path="/getDirections" component={Directions} />   
        </Switch>
    </Router>
)

  export default Routes;