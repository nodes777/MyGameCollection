import React from "react";
import {
	Text,
	ScrollView,
	View,
	TouchableOpacity,
	StyleSheet,
	Alert,
	Switch,
	TextInput,
	Image,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { Header } from "react-navigation";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

import { sendGameToFireStore } from "../api_requests/firebaseSendAndGet";

export default class AddDetailsScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log("In AddDetailsScreen");
	}

	state = {
		missingCase: false,
		missingManual: false,
		missingOther: false,
		missingOtherText: "",
		quality: "",
		priceAcquired: "",
		locationAcquired: "",
		comments: "",
	};

	onChangePriceAcquired(text) {
		let newText = "";
		let numbers = "0123456789";

		for (var i = 0; i < text.length; i++) {
			if (numbers.indexOf(text[i]) > -1) {
				newText = newText + text[i];
			} else {
				alert("please enter numbers only");
			}
		}
		this.setState({ priceAcquired: newText });
	}

	onFinishPress = () => {
		const detailsOnCopy = this.state;
		const gameDataFromBarcodeAndGiantBomb = this.props.navigation.state.params;
		const gameData = { detailsOnCopy, gameDataFromBarcodeAndGiantBomb };
		console.log(gameData);
		sendGameToFireStore(gameData).then((result) => {
			console.log(`${result} sending to firestore: `);
			if (result === "success") {
				this.props.navigation.navigate("Home");
			} else {
				console.log("sending data to firestore was not successful");
			}
		});
	};

	render() {
		return (
			<KeyboardAvoidingView
				keyboardVerticalOffset={Header.HEIGHT + 500}
				enabled
			>
				<Text style={styles.heading}>Missing:</Text>
				<View style={{ flexDirection: "row" }}>
					<Switch
						style={styles.switch}
						onValueChange={() =>
							this.setState({
								missingCase: !this.state.missingCase,
							})
						}
						value={this.state.missingCase}
					/>
					<Text style={styles.switchLabel}>Case</Text>
				</View>

				<View style={{ flexDirection: "row" }}>
					<Switch
						style={styles.switch}
						onValueChange={() =>
							this.setState({
								missingManual: !this.state.missingManual,
							})
						}
						value={this.state.missingManual}
					/>
					<Text style={styles.switchLabel}>Manual</Text>
				</View>

				<View style={{ flexDirection: "row" }}>
					<Switch
						style={styles.switch}
						onValueChange={() =>
							this.setState({
								missingOther: !this.state.missingOther,
							})
						}
						value={this.state.missingOther}
					/>
					<Text style={styles.switchLabel}>Other</Text>
					<TextInput
						label="Other missing item"
						editable={this.state.missingOther}
						style={[
							styles.textInput,
							{
								backgroundColor: this.state.missingOther ? "white" : "gray",
								marginTop: 8,
								width: 240,
							},
						]}
						onChangeText={(text) => this.setState({ missingOther: text })}
						value={this.state.missingOtherText}
					/>
				</View>

				<Text style={styles.heading}>Quality:</Text>

				<View style={styles.qualityContainer}>
					<TouchableOpacity
						style={[
							{
								borderWidth: this.state.quality === "Poor" ? 4 : 1,
							},
							styles.button,
						]}
						onPress={() => {
							this.setState({ quality: "Poor" });
						}}
					>
						<Text>Poor</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							{
								borderWidth: this.state.quality === "Good" ? 4 : 1,
							},
							styles.button,
						]}
						onPress={() => {
							this.setState({ quality: "Good" });
						}}
					>
						<Text>Good</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							{
								borderWidth: this.state.quality === "Excellent" ? 4 : 1,
							},
							styles.button,
						]}
						onPress={() => {
							this.setState({ quality: "Excellent" });
						}}
					>
						<Text>Excellent</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							{
								borderWidth: this.state.quality === "Sealed" ? 4 : 1,
							},
							styles.button,
						]}
						onPress={() => {
							this.setState({ quality: "Sealed" });
						}}
					>
						<Text>Sealed</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.acquiredContainer}>
					<View style={{ flexDirection: "column" }}>
						<Text style={styles.heading}>Price Acquired:</Text>
						<TextInput
							label="Price Acquired"
							style={styles.textInput}
							keyboardType="numeric"
							onChangeText={(text) => this.onChangePriceAcquired(text)}
							value={this.state.priceAcquired}
							maxLength={10}
						/>
					</View>
					<View style={{ flexDirection: "column" }}>
						<Text style={styles.heading}>Location Acquired:</Text>
						<TextInput
							label="Location Acquired"
							style={styles.textInput}
							onChangeText={(text) => this.setState({ locationAcquired: text })}
							value={this.state.locationAcquired}
						/>
					</View>
				</View>

				<Text style={styles.heading}>Comments:</Text>
				<TextInput
					label="Comments"
					multiline={true}
					textAlignVertical="top"
					style={styles.commentsInput}
					onChangeText={(text) => this.setState({ comments: text })}
					value={this.state.comments}
				/>

				<View style={{ flexDirection: "row", marginTop: 10 }}>
					<TouchableOpacity style={styles.backButton} onPress={this.onNoPress}>
						<Text style={styles.buttonText}>Back</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.finishButton}
						onPress={this.onFinishPress}
					>
						<Text style={styles.buttonText}>Finish</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

AddDetailsScreen.navigationOptions = {
	title: "Add Details On Your Copy",
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
		backgroundColor: "#fff",
	},
	button: {
		alignItems: "center",
		borderColor: "gray",
		padding: 10,
		height: 60,
		width: 100,
	},
	switch: {
		transform: [{ scaleX: 1.6 }, { scaleY: 1.6 }],
		margin: 10,
	},
	switchLabel: {
		fontSize: 14,
		marginTop: 14,
	},
	heading: {
		fontSize: 18,
		marginBottom: 10,
		color: "black",
	},
	textInput: {
		height: 40,
		width: 120,
		marginLeft: 4,
		borderColor: "gray",
		borderWidth: 1,
	},
	commentsInput: {
		height: 120,
		width: 360,
		marginLeft: 4,
		borderColor: "gray",
		borderWidth: 1,
	},
	qualityContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		margin: 2,
	},
	acquiredContainer: { flexDirection: "row", justifyContent: "space-evenly" },
	backButton: {
		alignItems: "center",
		backgroundColor: "red",
		padding: 10,
		height: 60,
		width: 200,
	},
	finishButton: {
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
