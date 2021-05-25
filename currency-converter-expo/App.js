import React, { useState } from "react";
import {
	StyleSheet,
	SafeAreaView,
	ScrollView,
	TextInput,
	Text,
	View,
	TouchableOpacity,
	Alert,
	StatusBar,
} from "react-native";

const currencyPerRupee = {
	DOLLAR: 0.014,
	EURO: 0.012,
	POUND: 0.011,
	RUBLE: 0.93,
	AUSDOLLAR: 0.2,
	CANDOLLAR: 0.019,
	YEN: 1.54,
	DINAR: 0.0043,
	BITCOIN: 0.000004,
};

const App = () => {
	const [inputValue, setInputValue] = useState("");
	const [resultValue, setResultValue] = useState(0);

	const convertCurrency = (currency) => {
		if (!inputValue) {
			return Alert.alert("Error", "Please enter some value");
		}
		let r = parseFloat(inputValue) * currencyPerRupee[currency];
		setResultValue(r.toFixed(3));
	};

	return (
		<>
			<StatusBar />
			<ScrollView
				backgroundColor="#1b262c"
				keyboardShouldPersistTaps="never"
				contentInsetAdjustmentBehavior="automatic"
			>
				<SafeAreaView style={styles.container}>
					<View>
						<Text style={styles.title}>Currency Converter</Text>
					</View>
					<View style={styles.resultContainer}>
						<Text style={styles.resultValue}>{resultValue}</Text>
					</View>
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							keyboardType="numeric"
							placeholder="Enter Value"
							placeholderTextColor="#FFFFFF"
							value={inputValue.toString()}
							onChangeText={(inputValue) =>
								setInputValue(inputValue)
							}
						/>
					</View>
					<View style={styles.convertButtonContainer}>
						{Object.keys(currencyPerRupee).map((currency) => (
							<TouchableOpacity
								key={currency}
								style={styles.currencyBox}
								onPress={() => convertCurrency(currency)}
							>
								<Text style={styles.currencyText}>
									{currency}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				</SafeAreaView>
			</ScrollView>
		</>
	);
};

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1b262c",
	},
	title: {
		fontSize: 40,
		marginTop: 30,
		color: "#FFF",
		alignSelf: "center",
	},
	resultContainer: {
		height: 70,
		marginTop: 30,
		justifyContent: "center",
		borderColor: "#bbe1fa",
		borderWidth: 2,
		alignItems: "center",
	},

	resultValue: {
		fontSize: 30,
		color: "#ffffff",
		fontWeight: "bold",
	},
	inputContainer: {
		height: 70,
		marginTop: 10,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
		borderColor: "#bbe1fa",
	},
	input: {
		fontSize: 20,
		textAlign: "center",
		color: "#FFFFFF",
	},

	convertButtonContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginTop: 10,
	},
	currencyBox: {
		height: 100,
		width: "33.3%",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
		borderColor: "#bbe1fa",
		backgroundColor: "#0f4c75",
		marginVertical: 10,
	},
	currencyText: {
		color: "#FFFFFF",
		// fontSize: 20,
		fontWeight: "bold",
	},
});
