import React, { useEffect, useState, useContext }              from 'react';
import { Appbar, ActivityIndicator, MD2Colors, FAB, Checkbox } from 'react-native-paper';
import {
  StyleSheet,
  View,
  PermissionsAndroid,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ToastAndroid, Alert
}                                                              from 'react-native';
import Contacts
                                                               from 'react-native-contacts';
import {
  Picker
}                                                              from '@react-native-picker/picker';
import { getAllContacts }                                      from '../../actions';
import {
  Color,
  fontColor
}                                                              from "../../assets/themeColor"
import CustomHeader                                            from '../../components/header/header';
import { GlobalContext }                                       from '../../store';
import { SET_ALL_CONTACTS, SET_CONTACT_ACTION }                from '../../store/const';
import ImportContact                                           from './importContact';
import MyModal                                                 from './modal';
const Contact = (props) => {
  const { navigation, route } = props;
  const groupName = route?.params?.groupName;
  const [state, setState] = useState({
    list: [],
    showModal: false,
    loading: true,
    contactCalling: false,
    editable: false
  });
  const [selectedValue, setSelectedValue] = useState();
  const [globalState, dispatch] = useContext(GlobalContext);

  const contacts = globalState.allContacts;
  const groups = globalState.groups;
  const contactAction = globalState.contactAction;

  useEffect(() => {
    setSelectedValue(groupName);
    console.log("Calling useEffect with unmounting")
  }, [groupName]);

  useEffect(() => {
    if (groups?.length === 0) {
      Alert.alert("Group Not Found", "Please create a group first");
      navigation.navigate("groups")
    }
  }, [groups]);

  useEffect(() => {
    console.log(contactAction, "Is calling ")
    let group = !!selectedValue ? selectedValue : groups.length > 0 ? groups[0]["groupName"] : null;
    if (group) {
      dispatch({ type: SET_ALL_CONTACTS, payload: [] });
      setState({ ...state, loading: true })
      getAllContacts(group)
        .then(response => {
          setState({ ...state, loading: false, contactCalling: false });
          dispatch({ type: SET_ALL_CONTACTS, payload: response })
          dispatch({ type: SET_CONTACT_ACTION, payload: false })
        })
    }
  }, [selectedValue, state.contactCalling, contactAction]);
  const RenderItems = (item, index, separators) => {
    // if (!!selectedValue && item.selectedValue === selectedValue) {
    return <TouchableOpacity style={ styles.list } key={ separators }>
      <View>
        <Text style={ { color: "red", fontWeight: "600", fontSize: 18 } }>
          { item.name }
        </Text>
        <Text style={ { color: "#000" } }>
          { item.number ? item.number : "NAN" }
        </Text>
      </View>
    </TouchableOpacity>
    // }
  }
  const callback = () => setState({ ...state, contactCalling: true });

  return (
    <React.Fragment>
      <CustomHeader
        navigation={ navigation }
        title={ "Contact List" }
        rightIcons={ [{ icon: "pen" }, { icon: "floppy" }, { icon: "magnify" }] }
        callback={ (data) => {
          console.log(data, "#####");
          if (data === "pen") {
            setState({ ...state, editable: true })
          }
        } }
      />

      { state.list.length === 1
        && <View style={ { flex: 1, justifyContent: "center", alignItems: "center" } }>
          <ActivityIndicator size={ 100 } animating={ true } color={ MD2Colors.red800 }/>
        </View> }

      <View style={ { backgroundColor: "#fff", flex: 1 } }>
        <View style={ { margin: 10, borderWidth: 1, borderColor: "#CF1000", borderRadius: 5 } }>
          <Picker
            dropdownIconColor={ "gray" }
            prompt={ `Select Group` }
            style={ { borderWidth: 1, borderColor: "red", color: "gray" } }
            selectedValue={ !!selectedValue && selectedValue }
            onValueChange={ (itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            {
              groups.length > 0
              && groups.map(({ groupName }, key) => <Picker.Item key={ key } label={ groupName } value={ groupName }/>)
            }
          </Picker>
        </View>
        {
          state.loading
          && <View style={ { flex: 2, justifyContent: "center", alignItems: "center" } }>
            <ActivityIndicator size={ "large" }/>
          </View>
        }
        <FlatList
          data={ contacts }
          renderItem={ ({ item, index, separators }) => RenderItems(item, index, separators) }/>
        <MyModal
          editableModal={ () => setState({ ...state, editable: false }) }
          editable={ state.editable }
          callback={ callback }
          navigation={ navigation }
          status={ state.showModal }
          value={ selectedValue }
        />
      </View>
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
export default Contact;
