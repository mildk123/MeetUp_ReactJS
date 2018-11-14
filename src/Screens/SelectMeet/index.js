import React, { Component, Fragment } from 'react'

// Drawer Material
import Drawer from '../../Helper/Drawer'
import SwipeCard from '../../Helper/Swipe-Card'

// Navbar
import NavBar from '../../Helper/NavBar/'

// Redux
import { updateMyData, updateOtherData } from '../../Redux/Actions/meetingAction'
import { connect } from 'react-redux'

// SweetAlert
import swal from 'sweetalert';

// CSS
import './style.css'

import firebase from '../../Config/firebase'
const database = firebase.database().ref();

class selectMeet extends Component {
    constructor() {
        super()
        this.state = {
            userListArray: [],
            myInfo: {},
            userDisliked: [],
            userLiked: [],
        }
        this.showDrawer = React.createRef()
    }

    componentDidMount() {
        this.getMyDataDb()
        this.getUsers()
    }

    getUsers = () => {
        database.child('/users').on('child_added', (response) => {
            this.setState(prevState => ({
                userListArray: [...this.state.userListArray, response.val()],
            }))
        })
    }

    getMyDataDb = () => {
        // getting my Data from server
        firebase.auth().onAuthStateChanged((myProfile) => {
            if (myProfile) {
                const uid = myProfile.uid
                database.child('users/' + uid).on('child_added', (myData) => {
                    this.setState(prevState => ({
                        myInfo: {
                            ...prevState.myInfo, [myData.key]: myData.val()
                        }
                    }),() => {
                        this.props.onUpdateMyData(this.state.myInfo)
                    }
                    )
                })
            }
        })
    }


    swipeRight = (UID, index) => {
        swal({
            title: "Are you sure?",
            text: `Do you want to meet ${this.state.userListArray[index].fullname} ?`,
            icon: "info",
            buttons: true,
            dangerMode: false,
        })
            .then((yes) => {
                const { userListArray } = this.state
                if (yes) {
                    let meetingPerson = {
                        fullname: userListArray[index].fullname,
                        pictures: userListArray[index].profilePicturesLink,
                        uid : userListArray[index].uid
                    }
                    this.setState({
                        meetingPerson,
                    },() => {
                        this.props.onUpdateOtherData(meetingPerson)
                        this.props.history.push('/Meet/MeetLocation')
                    } )
                } else {
                    return
                }
            });

    }

    swipeLeft = (UID, index) => {
        this.setState({
            userDisliked: [...this.state.userDisliked, UID]
        })
    }

    onEnd() {
        console.log('Please come later..')
    }

    Drawer = () => {
        this.showDrawer.current.handleClickOpen('left', true);
    }

    render() {
        return (

            <Fragment>
                <Drawer ref={this.showDrawer} props={this.props} />

                <NavBar Drawer={this.Drawer} btnColor={'secondary'}>Meet</NavBar>

                <SwipeCard
                    userListArray={this.state.userListArray}
                    swipeLeft={this.swipeLeft}
                    swipeRight={this.swipeRight}
                    onEnd={this.onEnd}
                />
                
            </Fragment >
        )
    }
}

const mapStateToProps = (state) =>{
    return state
}

const mapDispatchToProps = {
    onUpdateMyData : updateMyData,
    onUpdateOtherData : updateOtherData
}

export default connect(mapStateToProps,mapDispatchToProps)(selectMeet);