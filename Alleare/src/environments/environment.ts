// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import firebase from "firebase";

export const environment = {
  production: false,

  firebase : {
    apiKey: "AIzaSyBWUFKxYcjgsImEx8AAUmBOX7OSx1Wg0Tk",
    authDomain: "hshl20.firebaseapp.com",
    databaseURL: "https://hshl20.firebaseio.com",
    projectId: "hshl20",
    storageBucket: "hshl20.appspot.com",
    messagingSenderId: "781057794939",
    appId: "1:781057794939:web:f2bf7bb2b423d045a453de",
    measurementId: "G-8QG9PZE7B4"
}
};
firebase.initializeApp({
  projectId:"hshl20"
})

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
