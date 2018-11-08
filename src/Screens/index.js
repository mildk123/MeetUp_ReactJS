import React from 'react';

import Auth from './Auth/index';
import Home from './Home/index';
import Profile from './Profile/index';
import SelectMeet from './SelectMeet/';
import Directions from './SelectMeet/Directions'
import Requests from './Requests' ;

//Footer
import Footer from '../Helper/Footer';

import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import MeetLocation from './SelectMeet/MeetLocation';

import { Redirect } from 'react-router-dom';



class Routes extends React.Component {
    constructor() {
        super()
        this.state = {
            value: 0,
        };
    }

    handleClick = (name) => {
        if (name === "Dashboard") {
            this.setState({
                value: 0
            })
        } else {
            this.setState({
                value: 1
            })
        }
    }

    render() {
        // if (this.state.value === 0) {
        //     return <Redirect to="/" />
        // } else if (this.state.value === 1) {
        //     return <Redirect to="/requests" />
        // }
        return (

            <BrowserRouter>
                <div>
                    {this.state.value === 0 ? <Redirect to="/Home" /> : <Redirect to="/requests" />}
                    <Switch>
                        <Route exact path="/" component={Auth} />
                        <Route path="/Home" component={Home} />
                        <Route path="/Profile" component={Profile} />
                        <Route path="/requests" component={Requests} />
                        <Route exact path="/SelectMeeting" component={SelectMeet} />
                        <Route exact path="/SelectMeeting/meetlocation" component={MeetLocation} />
                        <Route path="/getDirections" component={Directions} />
                    </Switch>
                    <Footer value={this.state.value} handler={this.handleClick} />
                </div>
            </BrowserRouter>
        )
    }

}


export default Routes;