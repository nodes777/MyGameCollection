import { storeCredential } from "./firebase";
import * as Facebook from "expo-facebook";
import {
	FIRE_STORE_API_KEY,
	FIRE_STORE_PROJECT_ID,
	FIRE_STORE_AUTH_DOMAIN,
	FACEBOOK_APP_ID
} from "../constants/API_KEY";
import { Alert } from "react-native";

import { sendUserDataToFireStore } from "../api_requests/firebaseSendAndGet";

import * as firebase from "firebase";

// Required for side-effects
import "firebase/firestore";

export async function facebookLogin() {
	try {
		const {
			type,
			token,
			permissions
		} = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
			permissions: ["public_profile"]
		});
		if (type === "success") {
			console.log("Got user from Facebook");
			// Get the user's name using Facebook's Graph API
			const response = await fetch(
				`https://graph.facebook.com/me?access_token=${token}`
			);
			Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);

			// Build Firebase credential with the Facebook access token.
			const credential = firebase.auth.FacebookAuthProvider.credential(
				token
			);

			// Sign in with credential from the Facebook user.
			return await firebase
				.auth()
				.signInWithCredential(credential)
				.then(credential => {
					console.log("Signing in with credential");
					// set localStorage with credential
					storeCredential(credential.user.uid);
					return credential;
				})
				.then(credential => {
					console.log("Sending user data to firestore");
					sendUserDataToFireStore(credential.user);
					return credential.user.uid;
				})
				.catch(error => {
					console.log("Error in Firebase.signInWithCredential: ");
					console.log(error);
				});
		} else {
			// type === 'cancel'
			console.log("User cancelled Facebook login");
		}
	} catch ({ message }) {
		alert(`Facebook Login Error: ${message}`);
	}
}
