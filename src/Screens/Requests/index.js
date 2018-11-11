import React, { Component, Fragment } from 'react';

import Drawer from '../../Helper/Drawer'
import NavBar from '../../Helper/NavBar'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

// Add to calender
import AddCalendar from 'react-add-to-calendar'

import firebase from '../../Config/firebase'

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
                    let key = callback.key
                    let data = callback.val()
                    let request = {
                        VenueAdd: data.VenueAdd,
                        VenueName: data.VenueName,
                        meetingDate: data.meetingDate,
                        meetingTime: data.meetingTime,
                        personName: data.personName,
                        pictures: data.pictures,
                        senderUid: data.senderUid,
                        key : key
                    }


                    this.setState({
                        requestsForMe: [...this.state.requestsForMe, request]
                    })
                })

            } else {
                window.location.pathname = '/'
            }
        })
    }

    removeRequest = (key, arrayKey, senderUid) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.database().ref().child('meetings').child(senderUid).child(user.uid).update({
                    status: 'Cancelled'
                })
                firebase.database().ref().child('requests').child(user.uid).child(key).remove()
                
                let array = this.state.requestsForMe
                array.splice(arrayKey, 1)
                this.setState({
                    requestsForMe: array
                })
            } else {
                // No user is signed in.
                this.props.history.push('./Authentication')
            }
        });
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
                        return <Card 
                        key={index}
                        style={{
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: '2%',
                            maxWidth: '520px',
                            width: '95vw'
                        }}>
                            <CardActionArea>
                                <CardMedia
                                    style={{
                                        height: 440,
                                    }}
                                    image={item.pictures[0]}
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <div>
                                        <b>Meet :</b> {item.personName}<br />
                                        <b>Venue :</b>{item.VenueName}<br />
                                        <b>Address :</b>{item.VenueAdd}<br />
                                        <b>Date :</b>{item.meetingDate}<br />
                                        <b>Time :</b>{item.meetingTime} <br />
                                    </div>

                                </CardContent>
                            </CardActionArea>
                            <CardActions>

                                <Button size="small" variant="outlined" color="primary">
                                    Get Directions
                                </Button>}

                                <Button size="small" variant="outlined" color="primary">
                                    <AddCalendar />
                                </Button>

                                <Button 
                                variant="outlined" 
                                onClick={() => this.removeRequest(item.key, index, item.senderUid)} 
                                size="small" 
                                color="primary">
                                    Delete
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