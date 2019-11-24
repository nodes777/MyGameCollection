import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

export default class AddDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("In AddDetailsScreen");
  }

  render() {
    const gameDataFromBarcode = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 18, marginBottom: 10, color: "black" }}>
          Details Screen
        </Text>
        <Text style={{ fontSize: 18, marginBottom: 10, color: "black" }}>
          {JSON.stringify(gameDataFromBarcode)}
        </Text>
      </View>
    );
  }
}

AddDetailsScreen.navigationOptions = {
  title: "AddDetails"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
