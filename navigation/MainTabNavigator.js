import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/native";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";

import AddGameScreen from "../screens/AddGameScreen";
import ConfirmGameScreen from "../screens/ConfirmGameScreen";
import AddDetailsScreen from "../screens/AddDetailsScreen";

import SettingsScreen from "../screens/SettingsScreen";

const config = Platform.select({
	web: { headerMode: "screen" },
	default: {},
});

/* Home */
const HomeStack = createStackNavigator(
	{
		Home: HomeScreen,
	},
	config
);

HomeStack.navigationOptions = {
	tabBarLabel: "Home",
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={
				Platform.OS === "ios"
					? `ios-information-circle${focused ? "" : "-outline"}`
					: "md-information-circle"
			}
		/>
	),
};

HomeStack.path = "";

/* AddGame  */
const AddGameStack = createStackNavigator(
	{
		AddGameScreen: AddGameScreen,
		ConfirmGameScreen: ConfirmGameScreen,
		AddDetailsScreen: AddDetailsScreen,
	},
	config
);

AddGameStack.navigationOptions = {
	tabBarLabel: "Add Game",
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === "ios" ? "ios-link" : "md-link"}
		/>
	),
};

AddGameStack.path = "";

/* Settings  */
const SettingsStack = createStackNavigator(
	{
		Settings: SettingsScreen,
	},
	config
);

SettingsStack.navigationOptions = {
	tabBarLabel: "Settings",
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === "ios" ? "ios-options" : "md-options"}
		/>
	),
};

SettingsStack.path = "";

const tabNavigator = createBottomTabNavigator({
	HomeStack,
	AddGameStack,
	SettingsStack,
});

tabNavigator.path = "";

export default tabNavigator;
