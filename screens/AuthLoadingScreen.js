import React from "react";
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	StyleSheet,
	View,
} from "react-native";

export default class AuthLoadingScreen extends React.Component {
	componentDidMount() {
		this._bootstrapAsync();
	}

	// Fetch the token from storage then navigate to our appropriate place
	_bootstrapAsync = async () => {
		const userToken = await AsyncStorage.getItem("userToken");

		console.log("AuthLoadingScreen userToken:");
		console.log(userToken);

		// This will switch to the Home screen or SignIn screen and this loading
		// screen will be unmounted and thrown away.
		this.props.navigation.navigate(userToken ? "Home" : "SignIn", {
			userToken,
		});
	};

	// Render any loading content that you like here
	render() {
		return (
			<View>
				<ActivityIndicator />
				<StatusBar barStyle="default" />
			</View>
		);
	}
}
