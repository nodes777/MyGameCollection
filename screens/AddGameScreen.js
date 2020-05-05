import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { getGameDataFromBarcode } from "../getGameDataFromBarcode";

export default class AddGameScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		hasCameraPermission: null,
		type: Camera.Constants.Type.back,
		torchOn: false,
		isReadingBarcode: false,
	};

	async componentDidMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === "granted" });

		// getGameDataFromBarcode().then(gameDataFromBarcode => {
		//   console.log("after getGameData");

		//   this.setState({ isReadingBarcode: false });
		//   //if we have no errors and found a game, go to new screen
		//   this.props.navigation.navigate("ConfirmGameScreen", gameDataFromBarcode);
		// });
	}

	handleTorch() {}

	onBarCodeRead = (e) => {
		if (!this.state.isReadingBarcode) {
			this.setState({ isReadingBarcode: true });
			//Alert.alert("Barcode value is" + e.data, "Barcode type is" + e.type);
			getGameDataFromBarcode(e.data)
				.then((gameDataFromBarcode) => {
					console.log("after getGameData");

					this.setState({ isReadingBarcode: false });
					//if we have no errors and found a game, go to new screen
					this.props.navigation.navigate(
						"ConfirmGameScreen",
						gameDataFromBarcode
					);
				})
				.catch((err) => console.log(err));
		}
	};

	render() {
		const { hasCameraPermission } = this.state;
		if (hasCameraPermission === null) {
			return <View />;
		} else if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>;
		} else {
			return (
				<View style={styles.container}>
					<Camera
						style={{ flex: 1 }}
						torchMode={
							this.state.torchOn
								? Camera.Constants.FlashMode.on
								: Camera.Constants.FlashMode.off
						}
						onBarCodeScanned={this.onBarCodeRead}
						ref={(cam) => (this.camera = cam)}
					>
						<View style={styles.innerContainer}>
							{this.state.isReadingBarcode ? (
								<View style={styles.loadingSquare}>
									<Text
										style={{
											flex: 0.3,
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										Reading Barcode
									</Text>
								</View>
							) : null}
						</View>
						<TouchableOpacity
							style={styles.torchContainer}
							onPress={() => {
								this.setState({
									type:
										this.state.type === Camera.Constants.Type.back
											? Camera.Constants.Type.front
											: Camera.Constants.Type.back,
								});
							}}
						>
							<Text style={styles.torchText}>Torch On</Text>
						</TouchableOpacity>
					</Camera>
					<View style={styles.bottomOverlay}>
						<TouchableOpacity
							onPress={() => this.handleTourch(this.state.torchOn)}
						>
							{/*<Image
                style={styles.cameraIcon}
                source={
                  this.state.torchOn === true
                    ? require("../../images/flasher_on.png")
                    : require("../../images/flasher_off.png")
                }
              />*/}
						</TouchableOpacity>
					</View>
				</View>
			);
		}
	}
}

AddGameScreen.navigationOptions = {
	title: "AddGame",
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
		backgroundColor: "#fff",
	},
	innerContainer: {
		flex: 1,
		backgroundColor: "transparent",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	loadingSquare: {
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		width: 300,
		height: 300,
	},
	torchContainer: {
		flex: 0.075,
		alignItems: "center",
	},
	torchText: { fontSize: 18, marginBottom: 10, color: "white" },
});
