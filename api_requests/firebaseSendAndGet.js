import * as firebase from "firebase";
import { getUser } from "../logins/firebase";

export const sendGameToFireStore = async gameData => {
	var db = firebase.firestore();
	const uid = await getUser();
	console.log("uid: " + uid);

	// must alternate collection then doc
	db.collection("users")
		.doc(uid)
		.collection("games")
		.add(gameData)
		.then(function(docRef) {
			console.log(
				// `${
				// 	gameData.gameDataFromBarcodeAndGiantBomb.name
				// }Document written with ID: `,
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
