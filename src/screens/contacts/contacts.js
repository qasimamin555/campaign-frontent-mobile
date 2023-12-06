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
import editModal                                               from './assets/editModal';
import EditModal                                               from './assets/editModal';
import SaveModal                                               from './assets/saveModal';
import ImportContact                                           from './importContact';
import MyModal                                                 from './modal';

const Contact = (props) => {
  const { navigation, route } = props;
  const id = route?.params?.id;
  const [state, setState] = useState({
    list: [],
    showModal: false,
    loading: true,
    contactCalling: false,
    editable: false,
    editData: {},
    saveable: false,
    selectedContacts: []
  });
  const [selectedValue, setSelectedValue] = useState();
  const [globalState, dispatch] = useContext(GlobalContext);

  const contacts = globalState.allContacts;
  const groups = globalState.groups;
  const contactAction = globalState.contactAction;

  useEffect(() => {
    setSelectedValue(id);
  }, [id]);

  useEffect(() => {
    if (groups?.length === 0) {
      Alert.alert("Group Not Found", "Please create a group first");
      navigation.navigate("groups")
    }
  }, [groups]);

  useEffect(() => {
    let groupId = !!selectedValue ? selectedValue : groups.length > 0 ? groups[0]["_id"] : null;

    if (groupId) {
      dispatch({ type: SET_ALL_CONTACTS, payload: [] });
      setState({ ...state, loading: true })
      getAllContacts(groupId)
        .then(response => {
          setState({ ...state, loading: false, contactCalling: false });
          dispatch({ type: SET_ALL_CONTACTS, payload: response })
          dispatch({ type: SET_CONTACT_ACTION, payload: false })
        })
    }
  }, [selectedValue, state.contactCalling, contactAction]);
  const RenderItems = (item, index, separators) => {
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
  }
  const callback = () => setState({ ...state, contactCalling: true });
  const editGroup = () => {
    let group = groups.length > 0 ? groups[0] : null;
    if (!!selectedValue) {
      let findValue = groups.find(({ _id }) => _id === selectedValue);
      if (findValue) {
        setState({ ...state, editable: true, editData: findValue });
      }
    }
    else {
      setState({ ...state, editable: true, editData: group });
    }
  }
  const saveContact = () => {
    setState({ ...state, saveable: true });
  }

  return (
    <React.Fragment>
      <EditModal
        navigation={ navigation }
        data={ state.editData }
        visible={ state.editable }
        callback={ () => setState({ ...state, editable: false }) }
      />
      <SaveModal
        saveVisible={ state.saveable }
        navigation={ navigation }
        callback={ () => setState({ ...state, saveable: false }) }
      />
      <CustomHeader
        navigation={ navigation }
        title={ "Contact List" }
        rightIcons={ [{ icon: "magnify" }, { icon: "pen" }, { icon: "floppy" }] }
        callback={ (data) => {
          if (data === "pen") editGroup();
          else if (data === "floppy") saveContact();
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
              && groups.map(({ groupName, _id }, key) => {
                return <Picker.Item
                  key={ key }
                  label={ groupName }
                  value={ _id }
                />
              })
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
