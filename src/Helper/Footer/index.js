import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';



// import swal from 'sweetalert'

const styles = {
  root: {
    overflow: 'hidden',
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
};

class SimpleBottomNavigation extends React.Component {
  handleChange = (event, value) => {

  };



  render() {
    

    const { classes } = this.props;

    return (
      <BottomNavigation
        value={this.props.value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction onClick={() => this.props.handler('Dashboard', true)} label="Dashboard" icon={<RestoreIcon />} />
        <BottomNavigationAction onClick={() => this.props.handler('Requests', true)} label="Requests" icon={<FavoriteIcon />} />



        {/* <BottomNavigationAction onClick={() => swal('UNDER CONSTRUCTION')} label="Nearby" icon={<LocationOnIcon />} /> */}
      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBottomNavigation);
