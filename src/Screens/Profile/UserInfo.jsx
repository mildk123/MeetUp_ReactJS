import React, { Component, Fragment } from 'react';

import swal from 'sweetalert'

import TextField from '@material-ui/core/TextField';
import Paper from '../../Helper/Paper'
import Button from '@material-ui/core/Button';

import firebase from '../../Config/firebase'
const database = firebase.database().ref();


class userInfo extends Component {
    constructor() {
        super()
        this.state = {
            nickname : null,
            phoneNo : null
        }
    }


    onChangeHandler = (targetName, targetValue) => {
        this.setState({
            [targetName]: targetValue,
        })
    }

    uploadInfo = () => {
            if ((this.state.nickname !== null ) && (this.state.phoneNo !== null)) {
                firebase.auth().onAuthStateChanged((myProfile) => {
                    if (myProfile) {
                        const uid = myProfile.uid
                        const nickname = this.state.nickname
                        const phoneNo = this.state.phoneNo
                        database.child('users/' + uid).update({
                            uid: uid,
                            nickname: nickname,
                            phoneNo: phoneNo,
                        },() => {
                            this.props.history.push('Pic')
                        })
                    }
                });
            }else{
                swal('Please fill out the inputs')
            }
    }

    render() {
        return (
            <Fragment>
                <Paper style={{height: '80vh', padding: 5, maxWidth: 420}} >
                    <h4>Please Fill out the Information.</h4>
                    <form>
                        <TextField
                            required
                            type="text"
                            margin="normal"
                            label="Nickname"
                            name='nickname'
                            placeholder="Jazzy"
                            fullWidth
                            onChange={(apple) => {
                                this.onChangeHandler(apple.target.name, apple.target.value)
                            }} />

                        <TextField
                            required
                            type="number"
                            margin="normal"
                            label="Phone No."
                            name="phoneNo"
                            placeholder="0900-78601"
                            fullWidth
                            onChange={(apple) => {
                                this.onChangeHandler(apple.target.name, apple.target.value)
                            }}
                        />
                        <div
                        style={{
                            width: `100vw`,
                            background: '#e0e0e0',
                            position: 'fixed',
                            bottom: 0,
                            padding: 5,
                            }}>
                            <Button onClick={this.uploadInfo} variant="contained" color="secondary" >
                                Next
                     </Button>
                        </div>
                    </form>

                </Paper>
            </Fragment>
        );
    }
}

export default userInfo;