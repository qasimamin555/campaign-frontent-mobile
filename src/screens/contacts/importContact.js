import React, { useState, useContext, useEffect }              from 'react';
import { Appbar, ActivityIndicator, MD2Colors, Checkbox, FAB } from 'react-native-paper';
import {
  StyleSheet,
  View,
  PermissionsAndroid,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Platform, ToastAndroid
}                                                              from 'react-native';
import Contacts                                                from 'react-native-contacts';
import { Picker }                                              from '@react-native-picker/picker';
import { AddMultiContacts }                                    from '../../actions';
import { Color, fontColor }                                    from "../../assets/themeColor"
import { GlobalContext }                                       from '../../store';
import { SET_ALL_CONTACTS, SET_CONTACT_ACTION }                from '../../store/const';
import MyModal                                                 from './modal';

let data = [
  { displayName: "Qasim", phoneNumbers: "123123123" },
  { displayName: "Qasim", phoneNumbers: "123123123" },
  { displayName: "Qasim", phoneNumbers: "123123123" },
  { displayName: "Qasim", phoneNumbers: "123123123" },
  { displayName: "Qasim", phoneNumbers: "123123123" },
  { displayName: "Qasim", phoneNumbers: "123123123" },
  { displayName: "Qasim", phoneNumbers: "123123123" },
  { displayName: "Qasim", phoneNumbers: "123123123" },
  { displayName: "Qasim", phoneNumbers: "123123123" },
  { displayName: "Qasim", phoneNumbers: "123123123" },
  { displayName: "Qasim", phoneNumbers: "123123123" },
  { displayName: "Qasim", phoneNumbers: "123123123" },

]
const ImportContact = (props) => {
  const { navigation } = props;
  const [globalState, dispatch] = useContext(GlobalContext);
  const { groups, allContacts } = globalState;
  const [state, setState] = useState({
    list: [],
    showModal: false,
    contactList: [],
    validator: false,
    validateList: []
  })
  const [selectedValue, setSelectedValue] = useState();

  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    })
      .then((res) => {
        if (res === "granted") {
          getContacts();
        }
      })
      .catch((e) => {
        ToastAndroid.showWithGravity(
          e.message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        )
      })

  }, []);
  const getContacts = () => {
    Contacts.getAll()
      .then((data) => {
        let mapData = [];
        let id = 1;
        data.map(({ phoneNumbers, displayName }) => {
          mapData = [...mapData,
            {
              contactName: displayName,
              contactNumber: phoneNumbers?.[0]?.["number"] ? phoneNumbers[0]["number"] : "NAN",
              countryCode: "pk",
              id: id,
              mark: true,
            }];
          id++;
        })
        setState({ ...state, contactList: mapData, validator: true })
      })
      .catch((e) => {
        ToastAndroid.showWithGravity(
          e.message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        )
      });
  }

  const saveImportContacts = () => {
    if (selectedValue && selectedValue !== "Select group" && state.validator) {
      let groupData = state.validateList.length > 0 ? state.validateList : state.contactList;
      if (groupData.length > 0) {
        let result = groupData.map((data) => {
          return {
            associateGroup: selectedValue,
            name: data.contactName,
            number: data.contactNumber,
            country: data.countryCode,
          }
        });
        AddMultiContacts(result)
          .then(response => {
            if (response.success) {
              ToastAndroid.showWithGravity(
                "Contacts imported successfully",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
              )
              dispatch({ type: SET_CONTACT_ACTION, payload: true })
              navigation.navigate("contacts", { groupName: selectedValue });
            }
          })
      }
    }
    else {
      ToastAndroid.showWithGravity(
        "Select a group and at least one contact is required",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      )
    }
  }

  const onSelector = (data) => {
    let markCheck = [];
    let mapData = [];

    state.contactList.map((item) => {
      if (data.id === item.id) {
        item.mark === false && markCheck.push({ ...item, mark: !item.mark });
        mapData.push({ ...item, mark: !item.mark });
      }
      else {
        mapData.push(item);
        item.mark === true && markCheck.push(item);
      }
    })
    setState({ ...state, contactList: mapData, validator: markCheck.length > 0, validateList: markCheck })
  }

  return (
    <React.Fragment>
      <Appbar.Header style={ styles.header }>
        <Appbar.BackAction onPress={ () => navigation.goBack() } color={ "#fff" }/>
        <Appbar.Content style={ { alignItems: 'flex-start' } } color={ "#fff" } title="Contact List"/>
        <Appbar.Action color={ "#fff" } icon="pen"/>
        <Appbar.Action color={ "#fff" } icon="floppy"/>
        <Appbar.Action color={ "#fff" } icon="magnify"/>
      </Appbar.Header>

      {
        state.list.length === 1
        && <View style={ { flex: 1, justifyContent: "center", alignItems: "center" } }>
          <ActivityIndicator size={ 100 } animating={ true } color={ MD2Colors.red800 }/>
        </View>
      }

      <View style={ { backgroundColor: "#fff", flex: 1 } }>

        <View style={ { margin: 10, borderWidth: 1, borderColor: "#CF1000", borderRadius: 5 } }>
          <Picker
            style={ { borderWidth: 1, borderColor: "red", color: "gray" } }
            selectedValue={ selectedValue }
            onValueChange={ (itemValue, itemIndex) => {
              setSelectedValue(itemValue);
            } }>
            {
              groups.length > 0
                ? [{ groupName: "Select group" }, ...groups].map(({ groupName }) =>
                  <Picker.Item label={ groupName } value={ groupName }/>)
                : [{ groupName: "Select group" }].map(({ groupName }) =>
                  <Picker.Item label={ groupName } value={ groupName }/>)
            }
          </Picker>
        </View>

        <View style={ { marginHorizontal: 10 } }>
          <FlatList
            data={ state.contactList }
            renderItem={ ({ item, index, separators }) => (
              <View style={ styles.list } key={ separators }>
                <View>
                  <Text style={ { color: "red", fontWeight: "600", fontSize: 18 } }>
                    { item.contactName }
                  </Text>
                  <Text style={ { color: "#000" } }>
                    { item.contactNumber ? item.contactNumber : "NAN" }
                  </Text>
                </View>
                <View>
                  <Checkbox
                    onPress={ (e) => {
                      onSelector(item);
                    } }
                    status={ item.mark && "checked" }
                  />
                </View>
              </View>
            ) }
          />
        </View>

      </View>
      <FAB
        color={ fontColor }
        label={ "Import Contacts" }
        style={ styles.fab }
        onPress={ saveImportContacts }
      />
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color,
  },
  list: {
    backgroundColor: "#fff",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 2,

    flexDirection: "row",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.21,
    shadowRadius: 6.65,
    elevation: 9
  },
  fab: {
    position: 'absolute',
    marginVertical: 16,
    marginHorizontal: 50,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Color,
    borderRadius: 100,
    textAlign: "center",
  },
})
export default ImportContact
