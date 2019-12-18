import * as firebase from "firebase";
import {
	FIRE_STORE_API_KEY,
	FIRE_STORE_PROJECT_ID,
	FIRE_STORE_AUTH_DOMAIN
} from "../constants/API_KEY";

// Required for side-effects
import "firebase/firestore";

// Initialize Firebase
firebase.initializeApp({
	apiKey: FIRE_STORE_API_KEY,
	authDomain: FIRE_STORE_AUTH_DOMAIN,
	projectId: FIRE_STORE_PROJECT_ID
});

export const testToDb = () => {
	var db = firebase.firestore();

	db.collection("users")
		.add({
			first: "Ada",
			last: "Lovelace",
			born: 1815
		})
		.then(function(docRef) {
			console.log("Document written with ID: ", docRef.id);
		})
		.catch(function(error) {
			console.error("Error adding document: ", error);
		});
};

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
