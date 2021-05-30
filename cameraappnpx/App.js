import React, { useState } from 'react';

import { TouchableOpacity, StyleSheet, Image, View, Text, Button } from 'react-native';

import { RNCamera } from 'react-native-camera';

const PendingView = () => {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<Text style={{ fontSize: 30, color: 'red' }}>Loading...</Text>
		</View>
	);
};

const App = () => {
	const [ image, setImage ] = useState(null);

	const takePicture = async (camera) => {
		try {
			const options = { quality: 0.9, base64: false };
			const data = await camera.takePictureAsync(options);
			setImage(data.uri);
		} catch (error) {
			console.warn(error);
		}
	};

	return (
		<View style={styles.container}>
			{image ? (
				<View style={styles.preview}>
					<Text style={styles.camtext}>Here is your new profile pic</Text>
					<Image style={styles.clickedImage} source={{ uri: image, width: '100%', height: '80%' }} />
					<Button
						title="Click new Image"
						onPress={() => {
							setImage(null);
						}}
					/>
				</View>
			) : (
				<RNCamera
					style={styles.preview}
					type={RNCamera.Constants.Type.back}
					captureAudio={false}
					flashMode={RNCamera.Constants.FlashMode.on}
					androidRecordCameraPermissionOptions={{
						title: 'Permission to use camera',
						message: 'App needs to click pictures',
						buttonPositive: 'OK',
						buttonNegative: 'Cancel'
					}}
					androidRecordAudioPermissionOptions={{
						title: 'Permission to use audio',
						message: 'App needs to record audio',
						buttonPositive: 'OK',
						buttonNegative: 'Cancel'
					}}
				>
					{({ camera, status }) => {
						if (status != 'READY') return <PendingView />;
						return (
							<View
								style={{
									flex: 0,
									flexDirection: 'row',
									justifyContent: 'center'
								}}
							>
								<TouchableOpacity style={styles.capture} onPress={() => takePicture(camera)}>
									<Text>Snap</Text>
								</TouchableOpacity>
							</View>
						);
					}}
				</RNCamera>
			)}
		</View>
	);
};

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#0A79DF'
	},
	preview: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	capture: {
		flex: 0,
		backgroundColor: '#2827CC',

		padding: 20,
		alignSelf: 'center'
	},
	camtext: {
		backgroundColor: '#5DA3FA',
		color: '#FFFFFF',
		marginBottom: 10,
		width: '100%',
		textAlign: 'center',
		paddingVertical: 20,
		fontSize: 25
	},
	clickedImage: {
		width: 300,
		height: 300,
		borderRadius: 150
	}
});
