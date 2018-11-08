import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import LocationOnIcon from '@material-ui/icons/LocationOn';

// import swal from 'sweetalert'

const styles = {
  root: {
    // width: '100vw',
    overflow: 'hidden',
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Dashboard" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Requests" icon={<FavoriteIcon />} />
        {/* <BottomNavigationAction onClick={() => swal('UNDER CONSTRUCTION')} label="Nearby" icon={<LocationOnIcon />} /> */}
      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBottomNavigation);
