import React, { useState, useEffect, useContext }                                 from 'react';
import { View, StyleSheet, ToastAndroid }                                         from 'react-native';
import { Portal, Modal, Text, IconButton, FAB, TextInput }                        from 'react-native-paper';
import { updateGroup, getAllGroups, deleteGroup, getAllContacts, deleteContacts } from '../../../actions';
import { fontColor, Color }                                                       from '../../../assets/themeColor';
import { GlobalContext }                                                          from '../../../store';
import { SET_ALL_GROUPS, SET_ALL_CONTACTS }                                       from '../../../store/const';

const EditModal = (props) => {
  const [globalState, dispatch] = useContext(GlobalContext);
  const { visible, callback, data, navigation } = props;
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

  const update = (value, id) => {
    updateGroup(value, id)
      .then(response => {
        if (response) {
          getAllGroups()
            .then(response => {
              if (response) {
                dispatch({ type: SET_ALL_GROUPS, payload: response });
                ToastAndroid.showWithGravity(
                  "Updated successfully",
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                )
                navigation.navigate("main");
              }
            })
        }
      })
  }

  const removeGroup = () => {
    if (data?.["_id"]) {
      deleteGroup(data._id)
        .then(response => {
          if (response) {
            getAllGroups()
              .then(response => {
                if (response) {
                  dispatch({ type: SET_ALL_GROUPS, payload: response });
                  ToastAndroid.showWithGravity(
                    "Delete successfully",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                  )
                  navigation.navigate("main");
                }
              })
          }
        })
    }
  }

  const removeContacts = () => {
    if (data?.["_id"]) {
      deleteContacts(data._id)
        .then(response => {
          if (response) {
            getAllContacts()
              .then(response => {
                if (response) {
                  dispatch({ type: SET_ALL_CONTACTS, payload: response });
                  ToastAndroid.showWithGravity(
                    "Contacts deleted successfully",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                  )
                  navigation.navigate("main");
                }
              })
          }
        })
    }
  }

  return (
    <>
      <Portal>
        <Modal
          visible={ visible }
          onDismiss={ hideModal }
          contentContainerStyle={ containerStyle }
        >
          <View style={ styles.subContainer }>
            <View style={ styles.header }>
              <Text style={ styles.headerTitle }>
                Edit Group
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

            <TextInput
              placeholder={ "Group Name" }
              style={ styles.input }
              mode={ "outlined" }
              onChangeText={ (text) => setState({ ...state, value: text }) }
              value={ state.value }
            />

            <FAB
              uppercase={ true }
              color={ fontColor }
              label={ "Update" }
              style={ [styles.buttons, { backgroundColor: Color }] }
              onPress={ () => {
                update({ groupName: state.value }, data?._id && data._id)
              } }
            />

            <FAB
              uppercase={ true }
              color={ fontColor }
              label={ "delete group" }
              style={ styles.buttons }
              onPress={ removeGroup }
            />

            <FAB
              onPress={ removeContacts }
              uppercase={ true }
              color={ fontColor }
              label={ "delete contacts" }
              style={ styles.buttons }
            />
          </View>
        </Modal>
      </Portal>
    </>
  );
};

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
export default EditModal;
