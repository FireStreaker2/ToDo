import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	TextInput,
	TouchableOpacity,
} from "react-native";

const Stack = createStackNavigator();

interface Todos {
	title: string;
	description: string;
}

let todos: Todos[] = [
	{
		title: "Create a new TODO",
		description:
			'Press the "Create New TODO" Button! If you would like to delete a ToDo, press the "X" in the top right!',
	},
];

const saveTodos = async () => {
	try {
		await AsyncStorage.setItem("todos", JSON.stringify(todos));
	} catch (error: any) {
		alert("An error occurred while saving your data.");
		console.error(error);
	}
};

const retrieveTodos = async () => {
	try {
		const storedTodos = await AsyncStorage.getItem("todos");
		if (storedTodos) {
			todos = JSON.parse(storedTodos);
		}
	} catch (error: any) {
		alert("An error occurred while fetching your data.");
		console.error(error);
	}
};

interface NavigationProps {
	navigation: any;
}

const HomeScreen: React.FC<NavigationProps> = ({ navigation }) => {
	retrieveTodos();

	return (
		<View style={styles.container}>
			<Text style={styles.h1}>ToDo</Text>
			<Text style={styles.p}>Welcome Back!</Text>
			<Button title="Go To App" onPress={() => navigation.navigate("ToDos")} />
			<StatusBar style="auto" />
		</View>
	);
};

const ToDosScreen: React.FC<NavigationProps> = ({ navigation }) => {
	const [value, rerender] = useState(0);
	const [showConfirmation, setShowConfirmation] = useState(false);

	useFocusEffect(() => {
		(async () => {
			try {
				const refresh = await AsyncStorage.getItem("refresh");
				if (refresh === "true") {
					rerender(value + 1);
					await AsyncStorage.setItem("refresh", "false");
				}
			} catch (error: any) {
				alert("An error occurred.");
			}
		})();
	});

	const deleteToDo = (index: number) => {
		const updatedTodos = todos.filter((_, i) => i !== index);
		todos = updatedTodos;
		saveTodos();
		rerender(value + 1);
	};

	const clearToDos = () => {
		if (todos.length === 0) {
			alert("Nothing to clear.");
			setShowConfirmation(false);
			return;
		}

		todos = [];
		saveTodos();
		setShowConfirmation(false);
	};

	retrieveTodos();

	return (
		<View style={styles.container}>
			<Text style={styles.rerender}>{value}</Text>
			{todos.length === 0 ? (
				<Text style={styles.h1}>No ToDos Found.</Text>
			) : (
				<>
					{todos.map((item: Todos, index: number) => (
						<View key={index} style={styles.todo}>
							<Text style={styles.count}>{index + 1}.</Text>
							<Text style={styles.h1}>{item.title}</Text>
							<TouchableOpacity
								style={styles.close}
								onPress={() => deleteToDo(index)}
							>
								<Text style={styles.closeText}>X</Text>
							</TouchableOpacity>
							<Text style={styles.p}>{item.description}</Text>
						</View>
					))}
				</>
			)}
			<Button
				title="Create New TODO"
				onPress={() => navigation.navigate("CreateToDo")}
			/>
			<TouchableOpacity onPress={() => setShowConfirmation(true)}>
				<Text style={styles.clearAll}>Clear All</Text>
			</TouchableOpacity>

			{showConfirmation && (
				<View style={styles.confirmationContainer}>
					<Text style={styles.h1}>Are You Sure?</Text>
					<Text style={styles.p}>
						This will permanently delete all your ToDos.
					</Text>
					<View style={styles.confirmationButtonContainer}>
						<TouchableOpacity
							onPress={clearToDos}
							style={styles.confirmationButton}
						>
							<Text>Yes</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => setShowConfirmation(false)}
							style={styles.confirmationButton}
						>
							<Text>No</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}
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
			title: title !== "" ? title : "No Title Provided",
			description:
				description !== "" ? description : "No description provided.",
		});

		saveTodos();

		(async () => {
			try {
				await AsyncStorage.setItem("refresh", "true");
			} catch (error) {
				alert("An error occurred.");
			}
		})();

		alert("Succesfully Submitted!");
		navigation.navigate("ToDos");
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
				<Stack.Screen name="ToDos" component={ToDosScreen} />
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

	todo: {
		backgroundColor: "#cacaca",
		textAlign: "center",
		width: "50%",
		margin: 10,
	},

	count: {
		position: "absolute",
		top: 0,
		left: 0,
	},

	close: {
		position: "absolute",
		top: 0,
		right: 0,
	},

	closeText: {
		color: "#ff0000",
	},

	rerender: {
		display: "none",
	},

	clearAll: {
		color: "#ff0000",
		marginTop: 15,
	},

	confirmationContainer: {
		position: "absolute",
		backgroundColor: "#cacaca",
		textAlign: "center",
		width: "50%",
		height: "50%",
		justifyContent: "center",
	},

	confirmationButtonContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
	},

	confirmationButton: {
		margin: 10,
	},
});

export default App;
