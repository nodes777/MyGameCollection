import * as firebase from "firebase";
import {
	FIRE_STORE_API_KEY,
	FIRE_STORE_PROJECT_ID,
	FIRE_STORE_AUTH_DOMAIN,
	FACEBOOK_APP_ID
} from "../constants/API_KEY";
import { Alert, AsyncStorage } from "react-native";

// Required for side-effects
import "firebase/firestore";

// Initialize Firebase
firebase.initializeApp({
	apiKey: FIRE_STORE_API_KEY,
	authDomain: FIRE_STORE_AUTH_DOMAIN,
	projectId: FIRE_STORE_PROJECT_ID
});

firebase.auth().onAuthStateChanged(user => {
	if (user != null) {
		console.log("We are authenticated now!");
		console.log(user.uid);
	}
});

export const firebaseLogout = async () => {
	await firebase
		.auth()
		.signOut()
		.then(function() {
			AsyncStorage.removeItem("userToken", () => {
				console.log("removed userToken from AsyncStorage");
			});
			// the component calling this sends user to signin screen without checking for successful token removal here
			console.log("User is signed out");
		})
		.catch(function(error) {
			console.log(error);
		});
};

export const getUser = async () => {
	const uid = await AsyncStorage.getItem("userToken", (error, result) => {
		if (result) {
			// console.log(result);
			return result;
		} else {
			console.log("Error in AsyncStorage getUser");
			console.log(error);
		}
	});
	return uid;
};

export const storeCredential = async uid => {
	try {
		console.log("Storing credential");
		await AsyncStorage.setItem("userToken", uid, () => {
			console.log("Successful setItem in AsyncStorage");
		});
	} catch (error) {
		console.log("Error saving to AsyncStorage");
		console.log(error);
	}
};

// export const testToDb = () => {
// 	var db = firebase.firestore();

// 	db.collection("users")
// 		.add({
// 			first: "Ada",
// 			last: "Lovelace",
// 			born: 1815
// 		})
// 		.then(function(docRef) {
// 			console.log("Document written with ID: ", docRef.id);
// 		})
// 		.catch(function(error) {
// 			console.error("Error adding document: ", error);
// 		});
// };
