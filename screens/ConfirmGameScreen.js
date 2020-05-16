import React from "react";
import {
	Text,
	ScrollView,
	View,
	Button,
	TouchableOpacity,
	StyleSheet,
	Alert,
	TextInput,
	Image,
} from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

export default class ConfirmGameScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log("In ConfirmGameScreen");
	}

	onYesPress = () => {
		const gameData = this.props.navigation.state.params;
		this.props.navigation.navigate("AddDetailsScreen", gameData);
	};
	onNoPress() {
		Alert.alert("No has been pressed!");
	}

	render() {
		const gameData = this.props.navigation.state.params;

		return (
			<ScrollView style={styles.container}>
				<Text style={{ fontSize: 18, marginBottom: 10, color: "black" }}>
					Title: {gameData.title}
				</Text>
				<Text>Platform: {gameData.platform[0]}</Text>
				<Text>
					Developer:
					{gameData.developers.map((dev) => (
						<Text key={dev}> {dev}</Text>
					))}
				</Text>
				<Text>
					Publisher:
					{gameData.publishers.map((pub) => (
						<Text key={pub}> {pub}</Text>
					))}
				</Text>
				<Text>Release: {gameData.releaseDate}</Text>
				<View style={styles.imageContainer}>
					<Image
						source={{ uri: `${gameData.images.medium_url}` }}
						style={{ width: 300, height: 400 }}
					/>
				</View>
				<Text
					style={{
						fontSize: 18,
						marginBottom: 10,
						color: "black",
						alignItems: "center",
					}}
				>
					Is this your game?
				</Text>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.noButton} onPress={this.onNoPress}>
						<Text style={styles.buttonText}>No</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.yesButton} onPress={this.onYesPress}>
						<Text style={styles.buttonText}>Yes</Text>
					</TouchableOpacity>
				</View>
				<Text>{JSON.stringify(gameData)}</Text>
			</ScrollView>
		);
	}
}

ConfirmGameScreen.navigationOptions = {
	title: "Confirm Game",
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
		backgroundColor: "#fff",
	},
	imageContainer: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	buttonContainer: {
		flexDirection: "row",
	},
	noButton: {
		alignItems: "center",
		backgroundColor: "red",
		padding: 10,
		height: 60,
		width: 200,
	},
	yesButton: {
		alignItems: "center",
		backgroundColor: "green",
		padding: 10,
		height: 60,
		width: 200,
	},
	buttonText: {
		fontSize: 25,
		color: "white",
	},
});
