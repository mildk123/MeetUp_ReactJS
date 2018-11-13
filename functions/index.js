const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

// Sends a notifications to all users when a new message is posted.
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.sendNotification = functions.database.ref("Chats/{push}").onCreate(function(response) {
    const NOTIFICATION_SNAPSHOT = response._data;

    console.log("Chat Function");
    const payload = {
      notification: {
        title: `Message : ${NOTIFICATION_SNAPSHOT.AdID}`,
        body: `${NOTIFICATION_SNAPSHOT.msgMessage}`,
        icon: "http://aimgroup.com/wp-content/uploads/2016/06/OLX-Pak.png",
        click_action: "https://olx-app111.firebaseapp.com"
      }
    };

    return admin.database().ref(`/Tokens/${NOTIFICATION_SNAPSHOT.To}`).once("value").then(data => {
        debugger;

        if (!data.val()) return;

        const snapshot = data.val();
        Usertoken = snapshot.token;

        return admin.messaging().sendToDevice(Usertoken, payload);
      });
  });
