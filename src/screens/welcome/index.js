import React, { useCallback, useContext }           from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button }                                   from "react-native-paper";
import { GlobalContext }                            from '../../store';

const Welcome = (props) => {
  const { navigation } = props;

  return (
    <View style={ styles.container }>
      <View style={ styles.headingContainer }>
        <Text style={ styles.heading }>Welcome</Text>
        <Text style={ styles.text }>
          Come on, lets get the best discounts
          from your favorites plans
        </Text>
      </View>
      <View style={ styles.buttonContainer }>
        <Button
          rippleColor={ "#CF1000" }
          style={ { backgroundColor: "#fff", padding: 5, borderRadius: 100 } }
          icon="login"
          mode="outlined"
          onPress={ () => navigation.navigate("signup") }
        >
          LOGIN
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // To center the heading and push the button to the bottom
    padding: 20,
    backgroundColor: "#CF1000",
  },
  headingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 36,
    textAlign: 'center',
    color: '#fff',
    fontFamily: "serif",
    fontWeight: "bold"
  },
  buttonContainer: {
    width: "70%",
    marginBottom: 20, // Add margin to push the button to the bottom
    alignSelf: "center",
  },
  signupButton: {
    backgroundColor: '#fff', // Button background color
    padding: 10,
    borderRadius: 100,
  },
  buttonText: {
    color: '#CF1000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: "serif",
  },
  text: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: "serif",
  },
});
export default Welcome;
