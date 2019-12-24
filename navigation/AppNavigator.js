import React from "react";
import {
	createAppContainer,
	createSwitchNavigator,
	createStackNavigator
} from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import SignInScreen from "../screens/SignInScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";

const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(
	createSwitchNavigator(
		{
			// first goes to AuthLoadingScreen, that determines if user needs to signIn
			AuthLoading: AuthLoadingScreen,
			Auth: AuthStack,
			Main: MainTabNavigator
		},
		{
			initialRouteName: "AuthLoading"
		}
	)
);
