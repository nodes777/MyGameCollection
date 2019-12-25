import { storeCredential } from "./firebase";

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
			return await firebase
				.auth()
				.signInWithCredential(credential)
				.then(credential => {
					// set localStorage with credential
					storeCredential(credential.user.uid);
					// return with the uid
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
