import React from 'react';

import Auth from './Auth/index';
import Home from './Home/index';
import Profile from './Profile/index';
import Maps from './Map'
import SelectMeet from './SelectMeet/';
import Directions from './SelectMeet/Directions'
// import MeetLocation from './SelectMeet/MeetLocation';
import Requests from './Requests';


import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'

//Footer
import Footer from '../Helper/Footer';




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
                        <Route path="/Home" component={Home} />
                        <Route path="/Profile" component={Profile} />
                        <Route path="/selectLocation" component={Maps} />
                        <Route path="/requests" component={Requests} />
                        <Route exact path="/SelectMeeting" component={SelectMeet} />
                        {/* <Route exact path="/SelectMeeting/meetlocation" component={MeetLocation} /> */}
                        <Route path="/getDirections" component={Directions} />
                    </Switch>
                    <Footer value={this.state.value} handler={this.handleClick} />

                </div>
            </BrowserRouter>
        )
    }

}


export default Routes;