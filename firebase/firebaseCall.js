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
import * as Facebook from "expo-facebook";
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

export const sendGameToFireStore = gameData => {
	var db = firebase.firestore();

	db.collection("games")
		.add(gameData)
		.then(function(docRef) {
			console.log(
				`${
					gameData.gameDataFromBarcodeAndGiantBomb.name
				}Document written with ID: `,
				docRef.id
			);
		})
		.catch(function(error) {
			console.error("Error adding document: ", error);
		});
};

export const getGameDataFromFireStore = () => {
	db.collection("games")
		.get()
		.then(querySnapshot => {
			querySnapshot.forEach(doc => {
				console.log(`${doc.id} => ${doc.data()}`);
			});
		});
};

export const isUserLoggedIn = user => {
	firebase.auth().onAuthStateChanged(user => {
		this.props.navigation.navigate(user ? "Main" : "SignUp");
	});
};

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
			firebase
				.auth()
				.signInWithCredential(credential)
				.then(credential => {
					// set localStorage with credential
					_storeCredential(credential.user.uid);
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

export async function firebaseLogout() {
	firebase
		.auth()
		.signOut()
		.then(function() {
			AsyncStorage.removeItem("userToken", () => {
				console.log("removed userToken from AsyncStorage");
			});
			console.log("User is signed out");
		})
		.catch(function(error) {
			console.log(error);
		});
}

export const getUser = () => {
	AsyncStorage.getItem("userToken", (error, result) => {
		console.log(error);
		console.log(result);
		if (result) {
			console.log(result);
			return result;
		} else {
			console.log("Error in AsyncStorage getUser");
			console.log(error);
		}
	});
};

const _storeCredential = async uid => {
	try {
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
