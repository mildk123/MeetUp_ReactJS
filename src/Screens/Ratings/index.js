import React from 'react';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';

import firebase from '../../Config/firebase'

import { CurrentUserIndex } from '../../Redux/Actions/meetingAction'
import { connect } from 'react-redux'

class Ratings extends React.Component {

    handleRating = (star) => {
        let meetingPersonUid = (this.props.state.meetingReducer.meetingPerson)
        firebase.database().ref().child('users/').child(meetingPersonUid).update({
            Rating : `${star} stars`
        })
        this.props.history.push('/Home')
    }

    render() {
        return (
            <div>
                <Paper>
                    <Button onClick={() => this.handleRating(1)} color="primary">
                        1 Star
                                </Button>

                    <Button onClick={() => this.handleRating(2)} color="primary">
                        2 Star
                                </Button>
                    <Button onClick={() => this.handleRating(3)} color="primary">
                        3 Star
                                </Button>

                    <Button onClick={() => this.handleRating(4)} color="primary">
                        4 Star
                                </Button>

                    <Button onClick={() => this.handleRating(5)} color="primary">
                        5 Star
                                </Button>



                </Paper>
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
    onCurrentUserIndex : CurrentUserIndex
}

export default connect(mapStateToProps, mapDispatchToProps)(Ratings);
