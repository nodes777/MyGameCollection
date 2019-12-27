import * as firebase from "firebase";
import { getUser } from "../logins/firebase";

export const sendGameToFireStore = async gameData => {
	var db = firebase.firestore();
	const uid = await getUser();
	console.log("uid: " + uid);

	// must alternate collection then doc
	const result = await db
		.collection("users")
		.doc(uid)
		.collection("games")
		.add(gameData)
		.then(function(docRef) {
			console.log(`Document written with ID: `, docRef.id);
			return "success";
		})
		.catch(function(error) {
			console.error("Error adding document: ", error);
			return "failure";
		});
	return result;
};

export const sendUserDataToFireStore = async userData => {
	var db = firebase.firestore();
	const uid = userData.uid;
	console.log(uid);

	// get the user from firestore
	//var userRef = db.collection("users").doc(uid);
	// console.log(userRef);

	var user = firebase.auth().currentUser;

	await db
		.collection("users")
		//.where("userId", "==", user.uid)
		.doc(uid)
		.get()
		.then(function(doc) {
			// if user already exists
			if (doc.exists) {
				console.log("User exists:", doc.data());
			} else {
				// doc.data() will be undefined in this case
				console.log("No such user");
				// if user is undefined, create the user doc
				setUserData(userData);
			}
		})
		.catch(function(error) {
			console.log("Error getting user:", error);
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

const setUserData = async userData => {
	const result = await db
		.collection("users")
		.doc(uid)
		.set(
			Object.assign(
				{},
				{
					...userData.providerData[0],
					...userData.createdAt,
					...userData.emailVerified
				}
			),
			{ merge: true }
		)
		.then(function(whatIGetBack) {
			console.log(`Added user data: `, whatIGetBack);
			return "success";
		})
		.catch(function(error) {
			console.error("Error adding document: ", error);
			return "failure";
		});
	return result;
};
