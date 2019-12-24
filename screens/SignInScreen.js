import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";

import { facebookLogin, getUser } from "../firebase/firebaseCall";

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: "Please sign in"
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            facebookLogin();
          }}
        >
          <Text>Login With Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            getUser();
          }}
        >
          <Text>Check User</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 3,
    borderWidth: 1
  }
});
