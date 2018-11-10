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
                        return <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={props.dp}
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <div>
                                        <b>Meet :</b> {props.meetingWith}<br />
                                        <b>Venue :</b>{props.meetingVenue}<br />
                                        <b>Address :</b>{props.meetingVenueAdd}<br />
                                        <b>Date :</b>{props.meetingDate}<br />
                                        <b>Time :</b>{props.meetingTime} <br />
                                        <b>Status :</b>{props.status}<br />
                                    </div>

                                </CardContent>
                            </CardActionArea>
                            <CardActions>

                                {props.btnMid === null && <Button size="small" color="primary">
                                    {props.btnLeft}
                                </Button>}

                                {props.btnMid && <Button size="small" color="primary">
                                    {props.btnLeft}
                                </Button>}


                                <Button size="small" color="primary">
                                    {props.btnRight}
                                </Button>


                            </CardActions>
                        </Card>

                    })}

                </div>
            </Fragment>

        );
    }
}

export default Requests;