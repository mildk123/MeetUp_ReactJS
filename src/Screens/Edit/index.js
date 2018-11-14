import React from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

import NavBar from '../../Helper/NavBar';
import Drawer from '../../Helper/Drawer';

const styles = theme => ({
    menuItem: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& $primary, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
    primary: {},
    icon: {},
});

class ListItemComposition extends React.Component {
    constructor(){
        super()

        this.showDrawer = React.createRef()
    }


    Drawer = () => {
        this.showDrawer.current.handleClickOpen('left', true);
    }


    moveTo = (PathName) => {
        this.props.history.push(PathName)
    }

    render() {
        const { classes } = this.props;
        
        return (
            <Paper>
                <Drawer ref={this.showDrawer} props={this.props} />

                <NavBar Drawer={this.Drawer} btnColor="secondary">
                    Edit Profile
        </NavBar>
                <MenuList>
                    <MenuItem
                     className={classes.menuItem}
                     onClick={() => this.moveTo('/Profile/Info')}
                     >
                        <ListItemIcon className={classes.icon}>
                            <SendIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="Information" />
                    </MenuItem>

                    <MenuItem
                     className={classes.menuItem}
                     onClick={() => this.moveTo('/Profile/Pic')}
                     >
                        <ListItemIcon className={classes.icon}>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="Pictures" />
                    </MenuItem>

                    <MenuItem
                     className={classes.menuItem}
                     onClick={() => this.moveTo('/Profile/Choices')}
                     >
                        <ListItemIcon className={classes.icon}>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="Choices" />
                    </MenuItem>

                </MenuList>
            </Paper >
        );
    }

}

ListItemComposition.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItemComposition);