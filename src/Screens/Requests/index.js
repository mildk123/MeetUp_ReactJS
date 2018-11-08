import React, { Component, Fragment } from 'react';

import Drawer from '../../Helper/Drawer'
import NavBar from '../../Helper/NavBar'

class Requests extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.showDrawer = React.createRef()

    }

    Drawer = () => {
        this.showDrawer.current.handleClickOpen('left', true);
    }
    
    render() {
        return (
            <Fragment>
                <Drawer ref={this.showDrawer} />

                <NavBar Drawer={this.Drawer} btnColor="secondary">
                    Requests
                </NavBar>

                <h1>Requests</h1>
            </Fragment>

        );
    }
}

export default Requests;