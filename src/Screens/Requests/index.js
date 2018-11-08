import React, { Component, Fragment } from 'react';

import Drawer from '../../Helper/Drawer'
import NavBar from '../../Helper/NavBar'

import Dialog from '../../Helper/Dialog'

import firebase from '../../Config/firebase'
import Paper from '../../Helper/Paper'



class Requests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestsForMe: [],
            sendToDialog: []
        };

        this.showDrawer = React.createRef()
        this.expandRequest = React.createRef()

    }

    Drawer = () => {
        this.showDrawer.current.handleClickOpen('left', true);
    }

    openRequest = (index) => {
        this.setState({
            sendToDialog: this.state.requestsForMe[index]
        }, () => {
            this.expandRequest.current.handleOpen()
        })
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((myProfile) => {
            if (myProfile) {
                firebase.database().ref().child('requests/').child(myProfile.uid).on('child_added', (callback) => {
                    let key = callback.key
                    let data = callback.val()

                    
                    this.setState({
                        requestsForMe: [...this.state.requestsForMe, callback.val()]
                    })
                })

            } else {
                window.location.pathname = '/'
            }
        })
    }

    render() {
        return (
            <Fragment>
                <Drawer ref={this.showDrawer} />

                <NavBar Drawer={this.Drawer} btnColor="secondary">
                    Requests
                </NavBar>

                <div>
                    {this.state.requestsForMe.map((item, index) => {
                        return <Paper onClick={() => this.openRequest(index)} key={index} style={{ margin: 10, padding: 6, float: 'left', width: 340 }}>
                            <h4><strong>Meet: </strong>{item.personName}</h4>
                            {/* <img src={item.pictures[0]} alt={item.personName} /> */}
                            <button
                                onClick={(key, arrayKey) => this.remove(item.key, index)}
                                style={{
                                    float: 'right',
                                    marginRight: 5,
                                    border: 'none',
                                    color: 'white',
                                    background: '#ff6666',
                                    width: 30,
                                    borderRadius: '15px'
                                }}>X</button>
                        </Paper>
                    })}
                </div>

                <Dialog ref={this.expandRequest} data={this.state.sendToDialog} />
            </Fragment>

        );
    }
}

export default Requests;