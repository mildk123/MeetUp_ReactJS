import React, { Component } from 'react';

// Material Button
import Button from '@material-ui/core/Button';

// Drawer Material
import Drawer from '../../Helper/Drawer'

// Navbar
import NavBar from '../../Helper/NavBar/'

// SweetAlert
import swal from 'sweetalert'

// import { askForPermissioToReceiveNotifications } from  '../../push-notifications';

import { updateUser } from '../../Redux/Actions/authAction'
import { connect } from 'react-redux'

// SnackBar
import SnackbarContent from '@material-ui/core/SnackbarContent';

// Card
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import firebase from '../../Config/firebase'
const database = firebase.database().ref();


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSnackBar: true,
            meetingList: []
        };

        this.showDrawer = React.createRef()
        
        this.setMeeting = this.setMeeting.bind(this);

    }

    setMeeting() {
        this.props.history.push("/meet")
    }

    Drawer = () => {
        this.showDrawer.current.handleClickOpen('left', true);
    }


    componentDidMount() {
        firebase.auth().onAuthStateChanged((myProfile) => {
            if (myProfile) {
                this.props.onUpdateUser(myProfile);
                const uid = myProfile.uid
                database.child('meetings').child(uid).on('child_added', (callback) => {
                    let myAllMeetings = callback.val()
                    this.setState({
                        meetingList: [...this.state.meetingList ,{
                            meetingDate: myAllMeetings.meetingDate,
                            meetingTime: myAllMeetings.meetingTime,
                            meetingVenue: myAllMeetings.VenueName,
                            meetingVenueAdd: myAllMeetings.VenueAdd,
                            meetingWith: myAllMeetings.personName,
                            meetingWithPic: myAllMeetings.pictures,
                            status: myAllMeetings.status,
                            key: callback.key
                        }],
                        showSnackBar : false
                    })
                })
            }
        })
    }

    startMeet = (userUid, arrayKey) => {
        swal('Start Meet under construction!')
    }

    removeRequest = (userUid, arrayKey) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.database().ref().child('meetings').child(user.uid).child(userUid).remove()

                
                let array = this.state.meetingList
                array.splice(arrayKey, 1)
                this.setState({
                    meetingList: array
                })

            } else {
                // No user is signed in.
                this.props.history.push('./Authentication')
            }
        });
    }

    render() {
        return (
            <div>
                <Drawer ref={this.showDrawer} />

                <NavBar Drawer={this.Drawer} btnColor="secondary">
                    Dashboard
                    <Button onClick={this.setMeeting} color="primary" variant="contained" size="small">
                        Set a meeting!
                    </Button>                    
                </NavBar>



                <div>
                    {this.state.showSnackBar && <SnackbarContent
                        message={
                            'You haven’t done any meeting yet!”, try creating a new meeting!'
                        }
                    />}
                </div>

                <div>
                    {this.state.meetingList.map((item, index) => {
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
                                        height: 240,
                                    }}
                                    image={item.meetingWithPic[0]}
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <div>
                                        <b>Meet :</b> {item.meetingWith}<br />
                                        <b>Venue :</b>{item.meetingVenue}<br />
                                        <b>Address :</b>{item.meetingVenueAdd}<br />
                                        <b>Date :</b>{item.meetingDate}<br />
                                        <b>Time :</b>{item.meetingTime} <br />
                                        <b>status:</b> {item.status} 
                                    </div>

                                </CardContent>
                            </CardActionArea>
                            <CardActions>

                                {item.status !== 'Cancelled' && <Button 
                                size="small" 
                                variant="contained" 
                                color="secondary"
                                onClick={() => this.startMeet(item.key, index)}
                                >
                                    Start
                                </Button>}

                                <Button 
                                variant="contained" 
                                onClick={() => this.removeRequest(item.key, index)} 
                                size="small" 
                                color="primary">
                                    Delete
                                </Button>


                            </CardActions>
                        </Card>
                    })}
                </div>

            </div>
        );
    }
}


const mapStateToProps = (state, props) => {
    return {
        state
    }
}

const mapDispatchToProps = {
    onUpdateUser: updateUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);