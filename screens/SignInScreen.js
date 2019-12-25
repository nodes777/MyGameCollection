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

import { facebookLogin } from "../logins/facebook";

import { getUser } from "../logins/firebase";

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
            facebookLogin().then(uid => {
              //if we get back a uid then go to main screen
              if (uid) {
                this.props.navigation.navigate("Main");
              } else {
                console.log("No uid returned from facebookLogin");
              }
            });
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
