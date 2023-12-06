import { Picker }                                               from '@react-native-picker/picker';
import React, { Fragment, useContext, useEffect, useState }     from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList }   from 'react-native';
import { FAB, Checkbox }                                        from 'react-native-paper';
import { getAllGroups, getAllContacts }                         from '../../actions';
import { Color, fontColor }                                     from '../../assets/themeColor';
import CustomHeader                                             from '../../components/header/header';
import { GlobalContext }                                        from '../../store';
import { SET_ALL_GROUPS, SET_ALL_CONTACTS, SET_CONTACT_ACTION } from '../../store/const';
import SendMessageMode                                          from './sendMessageMode';

const Message = (props) => {
  const { navigation } = props;
  const [globalState, dispatch] = useContext(GlobalContext);
  const { groups } = globalState;

  const [state, setState] = useState({
    group: {},
    selectedValue: null,
    contacts: []
  })

  useEffect(() => {
    if (!(groups && groups.length)) {
      getAllGroups()
        .then(response => {
          if (response && response.length > 0) {
            dispatch({ type: SET_ALL_GROUPS, payload: response })
          }
        })
    }
  }, [groups]);

  useEffect(() => {
    let groupId = !!state.selectedValue ? state.selectedValue : groups.length > 0 ? groups[0]["_id"] : null;

    if (groupId) {
      getAllContacts(groupId)
        .then(response => {
          setState({ ...state, contacts: response })
        })
    }
  }, [state.selectedValue]);
  const OnChange = (name, value) => {
    setState({
      ...state,
      [name]: value
    })
  }

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
      <View>
        <Checkbox
          color={ Color }
          status={ "checked" }
        />
      </View>
    </TouchableOpacity>
  }


  return (
    <Fragment>
      <CustomHeader
        navigation={ navigation }
        title={ "Select Contacts" }
        rightIcons={ [{ icon: "magnify" }, { icon: "cog" }] }
        callback={ (data) => {
          dispatch({ type: SET_ALL_CONTACTS, payload: response })
          dispatch({ type: SET_CONTACT_ACTION, payload: false })
        } }
      />

      <View>
        <View style={ { marginHorizontal: 10, marginVertical: 5 } }>
          <Text style={ styles.labelTitle }>
            Select Group or Campaign
          </Text>
        </View>

        <View style={ { margin: 10, borderWidth: 1, borderRadius: 5, borderColor: Color } }>
          <Picker
            dropdownIconColor={ Color }
            style={ { color: "gray" } }
            selectedValue={ state.selectedValue ? state.selectedValue : null }
            onValueChange={ (itemValue, itemIndex) => OnChange("selectedValue", itemValue) }
          >
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

        <View style={ { marginHorizontal: 10, marginVertical: 5 } }>
          <Text style={ styles.labelTitle }>
            Select One Shot Range ( You can change from settings)
          </Text>
        </View>

        <View style={ { margin: 10, borderWidth: 1, borderRadius: 5, borderColor: Color } }>
          <Picker
            dropdownIconColor={ Color }
            style={ { color: "gray" } }
          >
            <Picker.Item label={ `1 - ${ state.contacts.length }` } value="pk"/>
          </Picker>
        </View>
      </View>

      <View style={ styles.selectAll }>
        <Checkbox
          color={ Color }
          status={ "checked" }
        />
      </View>

      <FlatList
        data={ state.contacts }
        renderItem={ ({ item, index, separators }) => RenderItems(item, index, separators) }/>

      <SendMessageMode
        navigation={ navigation }
        status={ state.status }
        onOpen={ () => setState({ ...state, status: true }) }
        onClose={ () => setState({ ...state, status: false }) }
        selectedContacts={ state.contacts }
      />

    </Fragment>
  )
}

const styles = StyleSheet.create({
  labelTitle: {
    color: "gray",
    fontWeight: "600"
  },
  fab: {
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
  selectAll: {
    alignSelf: "flex-end",
    marginHorizontal: 10
  }
})
export default Message;
