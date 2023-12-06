import { useState, useEffect } from 'react';
import * as React              from 'react';
import { View }                from 'react-native';
import {
  Modal,
  Portal,
  Text,
  Button,
  PaperProvider,
  FAB,
  Icon,
  MD3Colors,
  IconButton,
  TextInput
}                              from 'react-native-paper';
import { StyleSheet }          from 'react-native';
import { fontColor, Color }    from '../../assets/themeColor';
import AddContact              from './addContact';

const MyComponent = ({ status, navigation, value, callback, editable, editableModal }) => {
  const [visible, setVisible] = React.useState(status);
  const [state, setState] = useState({
    showAddContact: false
  })
  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    editableModal();
  };
  const containerStyle = { backgroundColor: 'white', margin: 30, borderRadius: 10 };

  useEffect(() => {
    if (editable) {
      showModal();
    }
  }, []);

  return (
    <View style={ styles.container }>
      <AddContact
        value={ value }
        setStatus={ () => setState({ ...state, showAddContact: false }) }
        status={ state.showAddContact }
        callback={ callback }
      />

      <Portal>
        <Modal
          visible={ visible }
          onDismiss={ hideModal }
          contentContainerStyle={ containerStyle }>
          <View style={ styles.subContainer }>
            <View style={ styles.header }>
              <Text style={ styles.headerTitle }>
                Add Contact Options
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
              label={ "Add Contact" }
              style={ styles.buttons }
              onPress={ () => {
                setState({ showAddContact: true })
                hideModal();
              } }
            />
            <FAB
              onPress={ () => {
                navigation.navigate("importContact")
                hideModal();
              } }
              uppercase={ true }
              color={ fontColor }
              label={ "Import Contacts" }
              style={ styles.buttons }
            />
          </View>
        </Modal>
      </Portal>

      <FAB
        color={ fontColor }
        label={ "Add Contact" }
        icon="plus"
        style={ styles.fab }
        onPress={ showModal }
      />
    </View>
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
export default MyComponent;
