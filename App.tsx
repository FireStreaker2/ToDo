import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
	return (
		<View style={styles.container}>
			<Text style={styles.h1}>ToDo</Text>
			<Text style={styles.p}>Welcome Back!</Text>
			<StatusBar style="auto" />
		</View>
	);
}

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
