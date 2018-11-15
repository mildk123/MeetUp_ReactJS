import React, { Component } from 'react';

// Material Button
import Button from '@material-ui/core/Button';

// Drawer Material
import Drawer from '../../Helper/Drawer'

// Navbar
import NavBar from '../../Helper/NavBar/'

// SweetAlert
import swal from 'sweetalert'

import { updateUser, } from '../../Redux/Actions/authAction'
import { CurrentUserIndex } from '../../Redux/Actions/meetingAction'
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
    }

    componentDidMount() {
        this.getMyMeeting()
    }

    setMeeting = () => {
        this.props.history.push("/Meet")
    }

    Drawer = () => {
        this.showDrawer.current.handleClickOpen('left', true);
    }

    getMyMeeting = () => {
        firebase.auth().onAuthStateChanged((myProfile) => {
            if (myProfile) {
                this.props.onUpdateUser(myProfile);
                const uid = myProfile.uid
                database.child('meetings').child(uid).on('child_added', (callback) => {
                    let myAllMeetings = callback.val()
                    this.setState({
                        showSnackBar: false,
                        meetingList: [...this.state.meetingList, {
                            meetingDate: myAllMeetings.meetingDate,
                            meetingTime: myAllMeetings.meetingTime,
                            meetingVenue: myAllMeetings.VenueName,
                            meetingVenueAdd: myAllMeetings.VenueAdd,
                            meetingWith: myAllMeetings.personName,
                            meetingWithPic: myAllMeetings.pictures,
                            status: myAllMeetings.status,
                            key: callback.key
                        }]
                    }, () => this.checkDate())
                })
            } else {
                this.props.history.push('/Authentication')
            }
        })
    }

    checkDate = () => {
        let dateObj = new Date()
        for (let key in this.state.meetingList) {
            let meetingDate = this.state.meetingList[key].meetingDate
            let meetingTime = this.state.meetingList[key].meetingTime

            let meetYear = meetingDate.slice(0, 4)
            let meetMonth = meetingDate.slice(5, 7)
            let meetDate = meetingDate.slice(8, 10)

            let meetHour = meetingTime.slice(0, 2)
            let meetMinutes = meetingTime.slice(3, 5)

            let meetme = new Date(meetYear, meetMonth - 1, meetDate, meetHour, meetMinutes)
            if (dateObj > meetme) {
                this.fireQuestion(key)
            }
        }
    }


    fireQuestion = (key) => {
        if (this.state.meetingList[key].status === 'Pending') {
            swal({
                text: `Did you meet ${this.state.meetingList[key].meetingWith} ?`,
                icon: "info",
                buttons: ["No", "Yes"],
                dangerMode: true,
            })
                .then((yes) => {
                    let meetingPersonUid = (this.state.meetingList[key].key)
                    if (yes) {
                        this.props.onCurrentUserIndex(meetingPersonUid)
                        database.child('meetings').child(firebase.auth().currentUser.uid).child(meetingPersonUid).update({
                            status: 'Done'
                        }, () => this.props.history.push('/Ratings'))
                    } else {
                        this.props.onCurrentUserIndex(meetingPersonUid)
                        database.child('meetings').child(firebase.auth().currentUser.uid).child(meetingPersonUid).update({
                            status: 'Cancelled'
                        }, () => this.props.history.push('/Ratings'))
                    }
                });
        }
    }

    removeRequest = (userUid, arrayKey) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                database.child('meetings').child(user.uid).child(userUid).remove()
                database.child('meetings').child(userUid).child(user.uid).remove()
                database.child('requests').child(userUid).child(user.uid).remove()

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
        const { showSnackBar, meetingList } = this.state;
        return (
            <div>
                <Drawer ref={this.showDrawer} props={this.props} />

                <NavBar Drawer={this.Drawer} btnColor="secondary">
                    Dashboard
                    <Button onClick={this.setMeeting} color="primary" variant="contained" size="small">
                        Set a meeting!
                    </Button>
                </NavBar>

                <div>
                    {showSnackBar && <SnackbarContent
                        message={
                            'You haven’t done any meeting yet!”, try creating a new meeting!'
                        }
                    />}
                </div>

                <div>
                    {meetingList.map((item, index) => {
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
    onCurrentUserIndex: CurrentUserIndex
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);