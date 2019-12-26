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

export const getGameDataFromFireStore = () => {
	db.collection("games")
		.get()
		.then(querySnapshot => {
			querySnapshot.forEach(doc => {
				console.log(`${doc.id} => ${doc.data()}`);
			});
		});
};
