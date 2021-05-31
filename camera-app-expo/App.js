import React, { useState,useEffect } from 'react';

import {StatusBar, TouchableOpacity, StyleSheet, Image, View, Text, Button } from 'react-native';

import { Camera} from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

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
  const [cameraRef, setCameraRef] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [flash, setFlash] = useState(null);
  const [flashImg, setFlashImg] = useState(null);
  
  useEffect(() => {
    setFlash(Camera.Constants.FlashMode.on);
    setFlashImg("flash-sharp");
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    }, []);
  if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

	const takePicture = async () => {
		try {
			const options = { quality: 0.9, base64: false };
			const data = await cameraRef.takePictureAsync(options);
			setImage(data.uri);
		} catch (error) {
			console.warn(error);
		}
	};

	return (
    
		<View style={styles.container}>
		<StatusBar/>
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
				<Camera
					style={styles.preview}
					type={Camera.Constants.Type.back}
					captureAudio={false}
					flashMode={flash}
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
          ref={(ref) => {
            setCameraRef(ref);
          }}
				>
					
							<View
								style={{
									flex: 1,
									flexDirection: 'row',
									justifyContent: 'center',
                  alignItems:"center"
								}}
							>
								<TouchableOpacity style={styles.capture} onPress={() => takePicture()}>
									<Text style={{color:"white"}}>Snap</Text>
								</TouchableOpacity>
								
                
								
							</View>
              <Ionicons style={styles.flashicon} name={flashImg} size={24} color="black" onPress={()=>{
                  if(flashImg=="flash-sharp"){
                    setFlashImg("flash-off");
                    setFlash(Camera.Constants.FlashMode.off);
                  }else{
                    setFlashImg("flash-sharp");
                    setFlash(Camera.Constants.FlashMode.on);
                  }

                }} />
				</Camera>
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
		color: 'white',
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
	},
  flashicon:{
    marginVertical:50,
    position:"absolute",
    top:20,
    left:30,
    
   
  }
});
