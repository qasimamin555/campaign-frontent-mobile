import { logPlugin }                                               from '@babel/preset-env/lib/debug';
import React, { useContext, useState, useEffect }                  from 'react';
import { FAB, Modal, IconButton, TextInput, Portal, Icon, Appbar } from 'react-native-paper';
import { StyleSheet, View, FlatList, TouchableOpacity, Text }      from 'react-native';
import { getAllGroups, AddGroup }                                  from '../../actions';
import { Color, fontColor }                                        from '../../assets/themeColor';
import CustomHeader                                                from '../../components/header/header';
import { GlobalContext }                                           from '../../store';
import { SET_ALL_GROUPS }                                          from '../../store/const';
import FontAwesome5                                                from 'react-native-vector-icons/FontAwesome5';

function Groups(props) {
  const [state, setState] = useState({
    showModal: false,
    name: "",
    searchStatus: false
  })

  const [globalState, dispatch] = useContext(GlobalContext);

  let groups = globalState.groups;
  const { navigation } = props;

  useEffect(() => {
    if (groups && groups.length === 0) {
      getGroups();
    }
  }, [groups])
  const getGroups = () => {
    getAllGroups()
      .then(response => {
        if (response && response.length > 0) {
          dispatch({ type: SET_ALL_GROUPS, payload: response })
        }
      })
  }
  const RenderItems = (item, index, separators) => {
    return <TouchableOpacity
      key={ index.toString() }
      onPress={ () => navigation.navigate("contacts", { id: item["_id"] }) }
      style={ styles.list }
    >
      <View>
        <Icon color={ Color } size={ 40 } source={ "account" }/>
      </View>
      <View style={ { width: "75%" } }>
        <Text numberOfLines={ 1 } style={ { color: "red", fontWeight: "600", fontSize: 18 } }>
          { item["groupName"] }
        </Text>
      </View>
      <View>
        <FontAwesome5 color={ Color } size={ 40 } name={ "angle-right" }/>
      </View>
    </TouchableOpacity>
  }

  const containerStyle = { backgroundColor: 'white', margin: 30, borderRadius: 10 };
  const onclose = () => setState({ ...state, showModal: false });
  const save = () => {
    if (state.name.trim() !== "") {
      AddGroup({ groupName: state.name })
        .then(response => {
          if (response) {
            dispatch({
              type: SET_ALL_GROUPS,
              payload: [...groups, { groupName: state.name, associateContacts: 0 }]
            });
            setState({ ...state, name: "", showModal: false });
          }
        })
    }
  }

  return (
    <React.Fragment>
      <CustomHeader
        navigation={ navigation }
        title={ "Group List" }
        rightIcons={ [{ icon: "magnify" }] }
        callback={ (data) => {
          if (data === "magnify") {
            setState({ ...state, searchStatus: true })
          }
        } }
      />

      <View style={ { backgroundColor: "#fff", flex: 1 } }>
        <FlatList
          keyExtractor={ (item, index) => {
            return index.toString();
          } }
          data={ groups }
          windowSize={ 5 }
          initialListSize={ 8 }
          initialNumToRender={ 8 }
          maxToRenderPerBatch={ 9 }
          renderItem={ ({ item, index, separators }) => RenderItems(item, index, separators) }/>
      </View>

      <Portal>
        <Modal
          visible={ state.showModal }
          onDismiss={ onclose }
          contentContainerStyle={ containerStyle }
        >
          <View style={ styles.subContainer }>
            <View style={ styles.header }>
              <Text style={ styles.headerTitle }>
                New Group
              </Text>
              <View style={ { margin: 10, alignSelf: "center" } }>
                <IconButton
                  onPress={ onclose }
                  icon="close"
                  iconColor={ "#fff" }
                  size={ 20 }
                />
              </View>
            </View>
            <TextInput
              label="Group Name"
              mode={ "outlined" }
              style={ { margin: 10 } }
              value={ state.name }
              onChangeText={ text => setState({ ...state, name: text }) }
            />
            <FAB
              uppercase={ true }
              color={ fontColor }
              label={ "Save" }
              style={ styles.buttons }
              onPress={ save }
            />
          </View>
        </Modal>
      </Portal>

      <FAB
        color={ fontColor }
        label={ "Add Group" }
        style={ styles.fab }
        onPress={ () => setState({ ...state, showModal: true }) }
      />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
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
    elevation: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
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
  },
  buttons: {
    backgroundColor: Color,
    marginHorizontal: 30,
    marginVertical: 10,
    borderRadius: 100
  },
})
export default Groups;
