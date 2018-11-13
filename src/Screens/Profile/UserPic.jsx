import React, { Component, Fragment } from 'react';

import swal from 'sweetalert'

import ImageUploader from 'react-images-upload';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';

import firebase from '../../Config/firebase'
const database = firebase.database().ref();


class UserPic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePictures: [],
            profilePicturesLink: []
        };
    }

    onDrop = (pictureFiles) => {
        this.setState({
            profilePictures: [...this.state.profilePictures, ...pictureFiles]
        })
    }

    imageUploadHandler = () => {
        let storageRef = firebase.storage().ref();

        firebase.auth().onAuthStateChanged((myProfile) => {
            if (myProfile) {
                const myUid = myProfile.uid;
                this.state.profilePictures.map((image) => {
                    return storageRef.child(`UserProfile Pictures/${myUid}/${image.name}`).put(image)
                        .then((snapshot) => {
                            return snapshot.ref.getDownloadURL();
                        })
                        .then(downloadURL => {
                            this.setState({
                                profilePicturesLink: [...this.state.profilePicturesLink, downloadURL]
                            })
                            database.child('users/' + myUid).update({
                                profilePicturesLink: this.state.profilePicturesLink
                            },() => {
                                this.state.profilePicturesLink.length === this.state.profilePictures.length && this.props.history.push('Choices')
                            })
                            return downloadURL;
                        })
                        .catch((error) => {
                            swal(error.message)
                        })
                })
            }
        })
    }


    render() {
        return (
            <Fragment>
                <Paper>
                    <ImageUploader
                        buttonText='Upload'
                        imgExtension={['.jpg', '.png']}
                        maxFileSize={10000000}
                        onChange={this.onDrop}
                        withPreview
                        label="'Select At least 3 images*"
                    />
                    <div style={{
                        width: `100vw`,
                        background: '#e0e0e0',
                        position: 'fixed',
                        bottom: 0,
                        padding: 5,
                        }}>
                        <Button
                            onClick={this.imageUploadHandler}
                            variant="contained"
                            color="secondary" >
                            Next
                     </Button>
                    </div>
                </Paper>
            </Fragment>
        );
    }
}

export default UserPic;