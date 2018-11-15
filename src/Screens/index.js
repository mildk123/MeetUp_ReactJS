import React from 'react';

import Auth from './Auth/index';

import Home from './Home/index';

import UserInfo from './Profile/UserInfo';
import UserPic from './Profile/UserPic';
import UserChoices from './Profile/UserChoices';

import Ratings from './Ratings'

import Maps from './Map'

import SelectMeet from './SelectMeet/index';
import meetLocation from './SelectMeet/MeetLocation.jsx'
import Directions from './SelectMeet/Directions'

import Requests from './Requests';
import Edit from './Edit';


import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'





class Routes extends React.Component {
    constructor() {
        super()
        this.state = {
            value: 0,
            redirectTo: 'Dashboard'
        };
    }

    handleClick = (name) => {
        if (name === "Dashboard") {
            this.setState({
                redirectTo: name,
                value: 0
            })
        } else {
            this.setState({
                redirectTo: name,
                value: 1
            })
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={Auth} />
                        <Route path="/Profile/info" component={UserInfo} />
                        <Route path="/Profile/Pic" component={UserPic} />
                        <Route path="/Profile/choices" component={UserChoices} />
                        <Route path="/setMyLocation" component={Maps} />
                        <Route path="/Home" component={Home} />
                        <Route path="/Ratings" component={Ratings} />
                        <Route path="/requests" component={Requests} />
                        <Route exact path="/Meet" component={SelectMeet} />
                        <Route exact path="/Meet/meetLocation" component={meetLocation} />

                        <Route path="/Edit" component={Edit} />

                        <Route path="/getDirections" component={Directions} />
                    </Switch>

                </div>
            </BrowserRouter>
        )
    }

}


export default Routes;