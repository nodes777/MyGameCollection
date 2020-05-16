import * as firebase from "firebase";
import { getUser } from "../logins/firebase";
import {
	FIRE_STORE_API_KEY,
	FIRE_STORE_AUTH_DOMAIN,
	FIRE_STORE_PROJECT_ID,
} from "../constants/API_KEY";

export const sendGameToFireStore = async (gameData) => {
	firebase.initializeApp({
		apiKey: FIRE_STORE_API_KEY,
		authDomain: FIRE_STORE_AUTH_DOMAIN,
		projectId: FIRE_STORE_PROJECT_ID,
	});
	var db = firebase.firestore();

	const uid = await getUser();
	console.log("uid: " + uid);

	// must alternate collection then doc
	const result = await db
		.collection("users")
		.doc(uid)
		.collection("games")
		.add(gameData)
		.then(function (docRef) {
			console.log(`Document written with ID: `, docRef.id);
			return "success";
		})
		.catch(function (error) {
			console.error("Error adding document: ", error);
			return "failure";
		});
	return result;
};

export const getGameDataFromFireStore = () => {
	db.collection("games")
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				console.log(`${doc.id} => ${doc.data()}`);
			});
		});
};

export const sendUserDataToFireStore = async (userData) => {
	var db = firebase.firestore();
	const uid = userData.uid;

	return await db
		.collection("users")
		.doc(uid)
		.get()
		.then(function (doc) {
			if (doc.exists) {
				console.log("User exists:", doc.data());
				return "user exists";
			} else {
				// doc.data() will be undefined in this case
				console.log("No such user, setting user data...");
				// if user is undefined, create the user doc
				return setUserData(userData);
			}
		})
		.catch(function (error) {
			console.log("Error getting user:", error);
		});
};

const setUserData = async (userData) => {
	var db = firebase.firestore();
	const result = await db
		.collection("users")
		.doc(userData.uid)
		.set(
			Object.assign(
				{},
				{
					...userData.providerData[0],
					createdAt: userData.createdAt,
					emailVerified: userData.emailVerified,
				}
			)
		)
		.then(() => {
			console.log(`Added user data`);
			return "user added";
		})
		.catch(function (error) {
			console.error("Error adding document: ", error);
			return "failure";
		});
	return result;
};
