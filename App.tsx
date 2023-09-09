import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const Stack = createStackNavigator();

interface HomeScreenProps {
	navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.h1}>ToDo</Text>
			<Text style={styles.p}>Welcome Back!</Text>
			<Button title="Go To App" onPress={() => navigation.navigate("App")} />
			<StatusBar style="auto" />
		</View>
	);
};

const AppScreen: React.FC = () => {
	return (
		<View style={styles.container}>
			<Text>Hello</Text>
		</View>
	);
};

const App: React.FC = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="App" component={AppScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},

	h1: {
		fontSize: 20,
	},

	p: {
		fontSize: 10,
	},
});

export default App;
