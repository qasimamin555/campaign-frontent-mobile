import * as React                                                  from 'react';
import { StyleSheet, View, TouchableOpacity, Text }                from 'react-native';
import { Appbar, TextInput, Button, ActivityIndicator, MD2Colors } from 'react-native-paper';

const SignUp = (props) => {
  const { navigation } = props;
  return (
    <View style={ styles.container }>
      <View style={ styles.subContainer }>
        <Appbar.Header style={ styles.header }>
          <Appbar.BackAction color={ "#fff" } onPress={ () => {
            navigation.navigate("welcome")
          } }/>
          <Appbar.Content color={ "#fff" } title="Sign Up"/>
        </Appbar.Header>

        <View style={ styles.form }>
          <TextInput
            cursorColor={ "#000" }
            activeUnderlineColor={ "#CF1000" }
            style={ styles.field }
            label="Name"
          />
          <TextInput
            cursorColor={ "#000" }
            activeUnderlineColor={ "#CF1000" }
            style={ styles.field }
            label="Business Name"
          />
          <TextInput
            cursorColor={ "#000" }
            activeUnderlineColor={ "#CF1000" }
            style={ styles.field }
            label="Email ID"
          />
          <TextInput
            cursorColor={ "#000" }
            activeUnderlineColor={ "#CF1000" }
            style={ styles.field }
            label="Mobile Number"
            keyboardType={ "numeric" }
          />
        </View>
      </View>
      <View style={ styles.buttonContainer }>
        <Button
          textColor={ "#fff" }
          rippleColor={ "#fff" }
          style={ { backgroundColor: "#CF1000", padding: 5, borderRadius: 100 } }
          icon="login"
          mode="outlined"
          onPress={ () => navigation.navigate("main") }
        >
          LOGIN
        </Button>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  subContainer: {
    flex: 1,
  },
  header: {
    backgroundColor: "#CF1000"
  },
  form: {
    margin: 10
  },
  field: {
    margin: 10,
    backgroundColor: "#fff"
  },
  buttonContainer: {
    width: "70%",
    marginBottom: 20, // Add margin to push the button to the bottom
    alignSelf: "center",
  },
  signupButton: {
    backgroundColor: '#CF1000', // Button background color
    padding: 10,
    borderRadius: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: "serif",
  },
});
export default SignUp
