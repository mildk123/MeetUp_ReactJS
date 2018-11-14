import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MailIcon from '@material-ui/icons/Mail';

// Firebase
import firebase from '../../Config/firebase'


class SwipeableTemporaryDrawer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      left: false,
    };

    this.toggleDrawer = this.toggleDrawer.bind(this)
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handleClickOpen = (side, open) => (
    this.setState({
      [side]: open
    })
  )

  signOut = () => {
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
      
      localStorage.removeItem('userSignup');
      localStorage.removeItem('myUid');
      
      window.location.pathname = './'
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }

  requests = () =>{
    window.location.pathname = '/requests'
  }

  dashboard = () => {
    window.location.pathname = '/Home'
  }

  Edit = () => {
    console.log(this.props)
    this.props.props.history.push('/Edit')
  }

  render() {

    const sideList = (
      <div>
        <List>

          <ListItem color="secondary">

            <ListItemIcon>
                <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" onClick={this.signOut}/>
            
          </ListItem>
          
          {window.location.pathname !== '/requests' && <ListItem color="secondary">
            <ListItemIcon>
                <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Requests" onClick={this.requests}/>            
          </ListItem>}

          {window.location.pathname !== '/Home' && <ListItem color="primary">
            <ListItemIcon>
                <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" onClick={this.dashboard}/>            
          </ListItem>}

          <ListItem color="secondary">
            <ListItemIcon>
                <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Profile" onClick={this.Edit}/>            
          </ListItem>

        </List>

        <Divider />

      </div>
    );

    return (
      <div>
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}


export default SwipeableTemporaryDrawer;