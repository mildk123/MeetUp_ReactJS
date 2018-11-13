import firebase from '../../Config/firebase'

// FACEBOOK PROVIDER
const provider = new firebase.auth.FacebookAuthProvider();
const database = firebase.database().ref();

const signUpWithFb = (props) => {
    firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            const fullname = result.user.displayName
            const email = result.user.email
            const uid = result.user.uid

            if (result.additionalUserInfo.isNewUser) {
                database.child('users/' + uid).set({
                    fullname,
                    email,
                    uid
                })
                props.history.push('/Profile/info')
            } else {
                props.history.push('/Home')
                localStorage.setItem('userSignup', true);
            }
        })

        .catch(function (error) {
            console.log(error.message)
        });
}

export {
    signUpWithFb
}