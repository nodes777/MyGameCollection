import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import SignInScreen from "../screens/SignInScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";

const Stack = createStackNavigator();

function AppNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="SignIn" component={SignInScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default AppNavigator;

// export default createAppContainer(
// 	createSwitchNavigator(
// 		{
// 			// first goes to AuthLoadingScreen, that determines if user needs to signIn
// 			AuthLoading: AuthLoadingScreen,
// 			Auth: AuthStack,
// 			Main: MainTabNavigator,
// 		},
// 		{
// 			initialRouteName: "AuthLoading",
// 		}
// 	)
// );
