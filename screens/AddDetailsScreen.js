import React from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  Image
} from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

export default class AddDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("In AddDetailsScreen");
  }

  state = {};

  onChangeText() {
    this.setState({});
  }

  render() {
    const gameDataFromBarcode = this.props.navigation.state.params;
    return (
      <ScrollView style={styles.container}>
        <Text style={{ fontSize: 18, marginBottom: 10, color: "black" }}>
          Title
        </Text>
        <TextInput
          label="Title"
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={text => this.onChangeText(text)}
          value={gameDataFromBarcode.title}
        />
        <TextInput
          label="Platform"
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={text => this.onChangeText(text)}
          value={gameDataFromBarcode.platform[0]}
        />
        <TextInput
          label="Developer"
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={text => this.onChangeText(text)}
          value={gameDataFromBarcode.developers[0]}
        />
        <TextInput
          label="Release Date"
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={text => this.onChangeText(text)}
          value={gameDataFromBarcode.releaseDate}
        />
        <Image
          source={{ uri: `${gameDataFromBarcode.images.medium_url}` }}
          style={{ width: 300, height: 400 }}
        />
        <Text style={{ fontSize: 18, marginBottom: 10, color: "black" }}>
          {JSON.stringify(gameDataFromBarcode)}
        </Text>
      </ScrollView>
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
