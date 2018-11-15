/* eslint-disable no-undef */
/* global google */

import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import swal from 'sweetalert'

import { connect } from 'react-redux';
import { directionLocation } from '../../Redux/Actions/mapActions';

const { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, Marker } = require("react-google-maps");

class ReqDirections extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getDirections = (myLocation, placeLocation) => {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route({
      origin: new google.maps.LatLng(myLocation.latitude, myLocation.longitude),
      destination: new google.maps.LatLng(placeLocation.latitude, placeLocation.longitude),
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result,
        });
      } else {
        console.log(result)
        swal("Sorry! Can't calculate directions!")
      }
    });
  }

  backPage = () =>{
    this.props.history.push('/Requests')
  }

  render() {
    return <div>
     <MyMapComponent
        isMarkerShown={true}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAdEpcl4TZffTuX0F7keZmYtaBFia1w_pQ"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `95vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        mylocation={this.props.state.mapReducer.direction.myLocation}
        placeLocation={this.props.state.mapReducer.direction.placeLocation}
        directions={this.state.directions}
      />

      <div
        style={{
          width: `100vw`,
          background: '#e0e0e0',
          position: 'fixed',
          bottom: 0,
          padding: 5,
        }}
      >
        <Button
          color="primary"
          variant='contained'
          onClick={(myLocation, placeLocation) => this.getDirections(this.props.state.mapReducer.direction.myLocation,
            this.props.state.mapReducer.direction.placeLocation)}
        >Get Directions
      </Button>

      <Button
      color="secondary"
      variant="contained"
      onClick={() => this.backPage()}
      >
        Back
      </Button>
      </div>


    </div>
  }
}


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
 <GoogleMap
    defaultZoom={14}
    defaultCenter={new google.maps.LatLng(props.mylocation.latitude, props.mylocation.longitude)}
    >    
    <Marker
      position={{ lat: props.mylocation.latitude, lng: props.mylocation.longitude }}
    />
    <Marker
      position={{ lat: props.placeLocation.latitude, lng: props.placeLocation.longitude }}
    />
    {props.directions && <DirectionsRenderer directions={props.directions} />}

  </GoogleMap>
))

const mapStateToProps = (state, props) => {
  return {
      state
  }
}

const mapDispatchToProps = {
  onDirectionLocation: directionLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(ReqDirections)