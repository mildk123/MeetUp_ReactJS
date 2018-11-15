import React, { Component, Fragment } from 'react';

// Map Component
import Map from '../../Components/Map/Map'

// NavBar Component
import NavBar from '../../Helper/NavBar/'

// Button Component
import Button from '@material-ui/core/Button';

// Drawer Material
import Drawer from '../../Helper/Drawer'

// firebase Config
import firebase from '../../Config/firebase'
const database = firebase.database().ref();




class SelecLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coords: null,
        };

        this.showDrawer = React.createRef()
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({ coords: position.coords })
        });
    }

    completedProfile = () => {
        firebase.auth().onAuthStateChanged((myProfile) => {
            if (myProfile) {
                const uid = myProfile.uid
                const latitude = this.state.coords.latitude;
                const longitude = this.state.coords.longitude;
                database.child('users/' + uid).child('location').update({
                    latitude: latitude,
                    longitude: longitude,
                })
                localStorage.setItem('userSignup', true);
                localStorage.setItem('myUid', uid);
            }
        })
        this.props.history.push('/Home');
    }

    updateCoords = ({ latitude, longitude }) => {
        this.setState({ coords: { latitude, longitude } })
    }

    
    Drawer = () => {
        this.showDrawer.current.handleClickOpen('left', true);
    }


    render() {
        return (
            <Fragment>
                <Drawer ref={this.showDrawer} props={this.props} />

             
                <NavBar Drawer={this.Drawer}  btnColor="secondary">Location</NavBar>
            <div>
                
                <Map updateCoords={this.updateCoords} coords={this.state.coords} />
                
                <div               
                    style={{
                        width: `100vw`,
                        background: '#e0e0e0',
                        position: 'fixed',
                        bottom: 0,
                        padding: 5,
                        }}>
                    <Button 
                    size="large" 
                    variant="contained" 
                    color="secondary" 
                    onClick={this.completedProfile}>All Done.
                    </Button>
                </div>
            </div>
            </Fragment>
        );
    }
}

export default SelecLocation;