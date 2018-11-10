import React, { Component, Fragment } from 'react';

import Drawer from '../../Helper/Drawer'
import NavBar from '../../Helper/NavBar'

// import Dialog from '../../Helper/Dialog'

import firebase from '../../Config/firebase'
import Card from '../../Helper/Card'



class Requests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestsForMe: [],
        };

        this.showDrawer = React.createRef()
    }

    Drawer = () => {
        this.showDrawer.current.handleClickOpen('left', true);
    }


    componentDidMount() {
        firebase.auth().onAuthStateChanged((myProfile) => {
            if (myProfile) {
                firebase.database().ref().child('requests/').child(myProfile.uid).on('child_added', (callback) => {
                    // let key = callback.key
                    // let data = callback.val()


                    this.setState({
                        requestsForMe: [...this.state.requestsForMe, callback.val()]
                    })
                })

            } else {
                window.location.pathname = '/'
            }
        })
    }


    addToCalendar = (index) => {
        debugger
        let event = {
            title: this.state.requestsForMe[index].personName,
            description: `Meet ${this.state.requestsForMe[index].personName} at ${this.state.requestsForMe[index].VenueName}`,
            location: this.state.requestsForMe[index].VenueAdd,
            startTime: `${this.state.requestsForMe[index].meetingDate}T20:${this.state.requestsForMe[index].meetingTime}`,
            endTime: `${this.state.requestsForMe[index].meetingDate}T20:${this.state.requestsForMe[index].meetingTime}`,
        }
        this.setState({
            event: event
        })
    }

    render() {
        return (
            <Fragment>
                <Drawer ref={this.showDrawer} />

                <NavBar Drawer={this.Drawer} btnColor="secondary">
                    Requests
                </NavBar>

                <div>
                    {this.state.requestsForMe.map((item, index) => {
                        return <Card key={index}  
                    meetingWith={item.personName} 
                    meetingVenueAdd={item.VenueAdd} 
                    meetingVenue={item.VenueName}
                    meetingDate={item.meetingDate} 
                    meetingTime={item.meetingTime} 
                    dp={item.pictures[0]}

                    requestsForMe={this.state.requestsForMe}
                    index={index}
                    btnLeft="Get Directions" 
                    btnMid="Add To Calender"
                    btnRight="Delete" />

                    })}
                       
                </div>
            </Fragment>

        );
    }
}

export default Requests;