import React, { useState, useEffect, useContext }             from 'react';
import { View, StyleSheet, ToastAndroid, PermissionsAndroid } from 'react-native';
import Contacts                                               from 'react-native-contacts';
import { Portal, Modal, Text, IconButton, FAB }               from 'react-native-paper';
import { fontColor, Color }                                   from '../../../assets/themeColor';
import { GlobalContext }                                      from '../../../store';

const SaveModal = (props) => {
    const [globalState, dispatch] = useContext(GlobalContext);

    const contacts = globalState.allContacts;
    const { saveVisible, callback, data } = props;
    const [state, setState] = useState({
      value: ""
    });
    const containerStyle = { backgroundColor: 'white', margin: 30, borderRadius: 10 };
    const hideModal = () => callback();

    useEffect(() => {
      if (data) {
        setState({ ...state, value: data.groupName })
      }
    }, [data]);
    const save = async () => {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to add in your contacts.',
        buttonPositive: 'Please accept bare mortal',
      })
        .then((res) => {
          if (res === "granted") {
            addContacts()
          }
        })
        .catch((e) => {
          ToastAndroid.showWithGravity(
            e.message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          )
        })
    }

    const addContacts = async () => {
      if (contacts && contacts.length) {
        contacts.map(async ({ name, number }) => {
          const newContact = {
            displayName: name,
            givenName: name,
            phoneNumbers: [{
              label: "mobile",
              number: number,
            }],
          }
          await Contacts.addContact(newContact)
            .catch(err => {
              ToastAndroid.showWithGravity(
                err.message,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
              )
            })
        })
        ToastAndroid.showWithGravity(
          "Added successfully",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        )
        hideModal();
      }
      else {
        ToastAndroid.showWithGravity(
          "Contact not found",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        )
      }
    }

    return (
      <>
        <Portal>
          <Modal
            visible={ saveVisible }
            onDismiss={ hideModal }
            contentContainerStyle={ containerStyle }
          >
            <View style={ styles.subContainer }>
              <View style={ styles.header }>
                <Text style={ styles.headerTitle }>
                  Select Option
                </Text>
                <View style={ { margin: 10, alignSelf: "center" } }>
                  <IconButton
                    onPress={ hideModal }
                    icon="close"
                    iconColor={ "#fff" }
                    size={ 20 }
                  />
                </View>
              </View>

              <FAB
                uppercase={ true }
                color={ fontColor }
                label={ "save to phone contacts" }
                style={ styles.buttons }
                onPress={ save }
              />
            </View>
          </Modal>
        </Portal>
      </>
    );
  }
;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  fab: {
    position: 'absolute',
    marginVertical: 16,
    marginHorizontal: 50,
    right: 0,
    bottom: 0,
    left: 0,
    // top:0,
    backgroundColor: Color,
    borderRadius: 100,
    textAlign: "center",
  },
  subContainer: {
    height: "auto",
    // margin: 20,
  },
  buttons: {
    backgroundColor: "#303030",
    marginHorizontal: 30,
    marginVertical: 10,
    borderRadius: 100
  },
  input: {
    marginHorizontal: 30,
    marginVertical: 10,
  },
  header: {
    backgroundColor: Color,
    height: 55,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 22,
    color: "#fff",
    alignSelf: "center",
    marginHorizontal: 20
  }
})
export default SaveModal;
