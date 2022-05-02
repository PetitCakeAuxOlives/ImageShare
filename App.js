import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import { useState } from 'react';

import dummy from './assets/images/dummy.png';
import { Platform } from 'expo-modules-core';

export default function App() {
  const [image, setImage] = useState(null);

  const openSharing = async () => {
   const canIShare = await Sharing.isAvailableAsync();
   console.log('canIShare:', canIShare);
   console.log(Platform);
   if (Platform.OS !== 'Web'){
     await Sharing.shareAsync(image);
   }
   else {
     alert('You can not share on your platform !')
   }
  }

  const openImagePicker = async () => {

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(permission);
    if (permission === false) {
      alert ('Permission to access your library is required !')
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
    if(pickerResult.cancelled){
      return;
  }
  setImage(pickerResult.uri);
}

if (image !== null){

  return (
    <View style={styles.container}>
      <Image source={ {uri: image}  } style={ {width: 300, height: 300 }} />

      <Text style={ {color: '#888', fontSize: 18} }>To share a photo please press the button below </Text>
      <TouchableOpacity
        onPress={ openSharing } 
        style={ styles.button }>
      <Text style={ styles.textWhite }>Share your photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={ () => { setImage(null) } } 
        style={ styles.button }>
      <Text style={ styles.textWhite }>Cancel</Text>
      </TouchableOpacity>
      
      <StatusBar style="auto" />
    </View>
  );
}

  return (
    <View style={styles.container}>
      <Image source={ dummy } style={ {width: 300, height: 300 }} />

      <Text style={ {color: '#888', fontSize: 18} }>To share a photo please press the button below </Text>
      <TouchableOpacity
        onPress={openImagePicker} 
        style={ styles.button }>
      <Text style={ styles.textWhite }>Pick a photo</Text>
      </TouchableOpacity>
      
      <StatusBar style="auto" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10
  },
  textWhite: {
    color: '#FFF',
  },


});
