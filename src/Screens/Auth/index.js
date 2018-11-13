import React, { Component, Fragment } from 'react';

// Login Dialog 
import LoginDialog from '../../Helper/LoginDialog/'

// Material Button
import Button from '@material-ui/core/Button';

// Facebook Login
import {signUpWithFb} from '../../Helper/FbLogin/index'

// Local CSS
import './style.css'




class AuthScreen extends Component {
    constructor() {
        super()

        this.showLogin = this.showLogin.bind(this);
        this.LoginDialogs = React.createRef()
    }


    componentWillMount() {
        if (localStorage.getItem('userSignup')) {
            this.props.history.push('Home')
        }
    }

    onChangeHandler = (targetName, targetValue) => {
        this.setState({
            [targetName]: targetValue,
        })
    }

    showLogin = () => {
        this.LoginDialogs.current.handleClickOpen();
    }

    render() {
        return <Fragment >
            <div className="myComponent">
                <h1>Meeting App</h1>

                <LoginDialog ref={this.LoginDialogs} />

                <div className='btnDiv'>
                    <Button className="btn" onClick={this.showLogin} variant="contained" color="secondary" >
                        Login
                    </Button>

                    <Button className="btn" onClick={() => signUpWithFb(this.props)} variant="contained" color="primary" >
                        Facebook
                    </Button>
                </div>

            </div>
        </Fragment>
    }


}

export default AuthScreen;