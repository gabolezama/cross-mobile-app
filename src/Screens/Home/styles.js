import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: '100%',
      height: '100%',
    },
    reqButton:{
      position: 'absolute',
      bottom: 30,
      right: 30
    },
    reqButtonText:{
      position: 'absolute',
      top: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: 'black',
      padding: 5,
      backgroundColor: 'white'
    },
    iconContainer:{
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderRadius: 50,
        width: 80,
        height: 80,
        backgroundColor: '#6772EA'
    }
  });