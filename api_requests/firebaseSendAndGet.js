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
