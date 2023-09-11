import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

const Stack = createStackNavigator();

let todos = [
	{
		title: "Create a new TODO",
		description: 'Press the "Create New TODO" Button!',
	},
];

interface NavigationProps {
	navigation: any;
}

const HomeScreen: React.FC<NavigationProps> = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.h1}>ToDo</Text>
			<Text style={styles.p}>Welcome Back!</Text>
			<Button title="Go To App" onPress={() => navigation.navigate("App")} />
			<StatusBar style="auto" />
		</View>
	);
};

const AppScreen: React.FC<NavigationProps> = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<>
				{todos.map((item, index) => (
					<Text key={index}>
						{item.title}, {item.description}
					</Text>
				))}
			</>
			<Button
				title="Create New TODO"
				onPress={() => navigation.navigate("CreateToDo")}
			/>
		</View>
	);
};

const CreateToDoScreen: React.FC<NavigationProps> = ({ navigation }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const handleTitleChange = (text: string) => {
		setTitle(text);
	};

	const handleDescriptionChange = (text: string) => {
		setDescription(text);
	};

	const submitData = () => {
		if (!title && !description) {
			alert("Please Enter A Value.");
			return;
		}

		todos.push({
			title: title,
			description: description,
		});

		alert("Succesfully Submitted!");
		navigation.navigate("Home");
	};

	return (
		<View style={styles.container}>
			<Text>Enter Info</Text>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Title"
					onChangeText={handleTitleChange}
					onSubmitEditing={submitData}
					value={title}
					style={styles.input}
				/>
				<TextInput
					placeholder="Description"
					onChangeText={handleDescriptionChange}
					onSubmitEditing={submitData}
					value={description}
					style={styles.input}
				/>
			</View>
			<Button title="Submit" onPress={submitData} />
		</View>
	);
};

const App: React.FC = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="App" component={AppScreen} />
				<Stack.Screen name="CreateToDo" component={CreateToDoScreen} />
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

	input: {
		backgroundColor: "#cacaca",
		textAlign: "center",
		margin: 3,
	},

	inputContainer: {
		margin: 30,
	},
});

export default App;
