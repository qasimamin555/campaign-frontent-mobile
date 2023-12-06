import React, { Fragment, useRef, useEffect, useState }         from 'react';
import { View, Text, StyleSheet, TextInput, AppState, Linking } from 'react-native';
import { IconButton, FAB, Checkbox }                            from 'react-native-paper';
import { Color, fontColor }                                     from '../../assets/themeColor';
import CustomHeader                                             from '../../components/header/header';

function SendMessage(props) {
  const { navigation, route } = props;
  const [state, setState] = useState({
    numbers: []
  });
  const contacts = route?.params?.data && route.params.data;

  const appState = useRef(AppState.currentState);
  const messageSentCount = useRef(0);
  const messageSentStatus = useRef(false);
  const { numbers } = state;

  useEffect(() => {
    if (contacts && contacts.length) {
      setState({ ...state, numbers: contacts })
    }
  }, [contacts]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", async nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        console.log("InAppState", numbers.length, messageSentCount);
        if (numbers.length > messageSentCount["current"] && messageSentStatus.current) {
          const message = "Hello ///"; // Replace with your desired message
          await openLinking(numbers[messageSentCount["current"]], message);
        }
        else {
          console.log(":App is in the Else state of appState");
          messageSentStatus.current = false;
          messageSentCount.current = 0;
        }
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const startMessageSending = () => {
    getPermission();
  }

  const openLinking = async (phoneNumber, message) => {
    const whatsappURL = `whatsapp://send?phone=${ phoneNumber.number }&text=${ encodeURIComponent(message) }`;

    // Open the WhatsApp chat
    await Linking.openURL(whatsappURL)
      .then(() => {
        messageSentCount.current = messageSentCount.current + 1;
      });
  };
  const getPermission = () => {
    const acc_setting = "android.settings.ACCESSIBILITY_SETTINGS";

    Linking.sendIntent(acc_setting)
      .then(async (data) => {
        const message = "Hello ///"; // Replace with your desired message

        messageSentStatus.current = true;
        await openLinking(numbers[0]["number"], message);
      })
      .catch(() => {
        console.error("An error occurred");
      });
  };

  console.log(JSON.stringify(state.numbers, null, 2));
  return (
    <Fragment>
      <CustomHeader
        navigation={ navigation }
        title={ "Select Contacts" }
        callback={ (data) => {
        } }
      />
      <View style={ styles.container }>
        <Text style={ styles.note }>
          Note : if number is not saved in your contacts please use advanced
          mode to send attachments
        </Text>

        <View style={ { alignSelf: "flex-end" } }>
          <IconButton
            icon="content-save-all"
            iconColor={ Color }
            size={ 30 }
          />
        </View>

        <TextInput
          style={ {
            borderWidth: 1,
            borderColor: Color,
            borderRadius: 10,
          } }
          mode={ "outlined" }
          multiline={ true }
          numberOfLines={ 10 }
          placeholder={ "Message Box" }
        />

        <FAB
          color={ fontColor }
          icon="camera"
          style={ styles.fab }
        />

        <View>
          <View style={ styles.checkbox }>
            <Checkbox color={ Color } status={ "unchecked" }/>
            <Text style={ styles.text }>Add Option To Unsubscribe</Text>
          </View>
          <View style={ styles.checkbox }>
            <Checkbox color={ Color } status={ "unchecked" }/>
            <Text style={ styles.text }>Enable Random Coder</Text>
          </View>
          <View style={ styles.checkbox }>
            <Checkbox color={ Color } status={ "unchecked" }/>
            <Text style={ styles.text }>Remove Non WhatsApp Contacts</Text>
          </View>
        </View>

        <View style={ styles.list }>
          <Text style={ [styles.text, { color: Color }] }>
            Total Selected
          </Text>
          <Text style={ styles.text }>
            { contacts ? contacts.length : 0 }
          </Text>
        </View>

        <View style={ styles.list }>
          <Text style={ [styles.text, { color: "blue" }] }>
            Total Sent
          </Text>
          <Text style={ styles.text }>
            { contacts ? contacts.length : 0 }
          </Text>
        </View>

        <View style={ styles.list }>
          <Text style={ [styles.text, { color: "red" }] }>
            Not found
          </Text>
          <Text style={ styles.text }>
            0
          </Text>
        </View>

      </View>

      <FAB
        color={ fontColor }
        label={ "Start" }
        style={ styles.fabM }
        onPress={ startMessageSending }
      />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  note: {
    color: Color
  },
  fab: {
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Color,
    borderRadius: 100,
    alignSelf: "flex-start",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    color: "#000",
    fontSize: 18
  },
  fabM: {
    position: 'absolute',
    marginVertical: 16,
    marginHorizontal: 100,
    right: 0,
    bottom: 0,
    left: 0,
    // top:0,
    backgroundColor: Color,
    borderRadius: 100,
    textAlign: "center",
    fontSize: 22,
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 2
  }
})
export default SendMessage;
