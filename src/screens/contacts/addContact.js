import { Picker }                                  from '@react-native-picker/picker';
import { useEffect, useContext, useState, useRef } from 'react';
import * as React                                  from 'react';
import { View }                                    from 'react-native';
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
}                                                  from 'react-native-paper';
import { StyleSheet }                              from 'react-native';
import { AddContacts }                             from '../../actions';
import { fontColor, Color }                        from '../../assets/themeColor';
import { GlobalContext }                           from '../../store';
import { SET_CONTACT_ACTION }                      from '../../store/const';

const AddContact = ({ status, setStatus, value, callback }) => {
  const [visible, setVisible] = React.useState(status);
  const [globalState, dispatch] = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    contactName: "",
    selectGroup: "",
    countryCode: "",
    contactNumber: ""
  })

  const { groups, allContacts } = globalState;

  useEffect(() => {
    if (groups && groups.length > 0) {
      console.log(groups, "11111111111111111111")
      setFormData({ ...formData, selectGroup: groups[0]["_id"] })
    }
  }, []);

  useEffect(() => {
    if (value) {
      setFormData({ ...formData, selectGroup: value })
    }
  }, [value])
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = { backgroundColor: 'white', margin: 30, borderRadius: 10 };
  const OnChange = (name, value) => setFormData({ ...formData, [name]: value });
  const saveContact = () => {
    if (formData
      && formData.contactName.trim() !== ""
      && formData.contactNumber.trim() !== ""
      && !!formData.selectGroup
      && !!formData.countryCode) {
      AddContacts(formData)
        .then(response => {
          if (response) {
            setFormData({
              contactName: "",
              selectGroup: "",
              countryCode: "",
              contactNumber: ""
            });
            callback();
            setStatus();
          }
        })
    }
    else alert("Fields are required");
  }

  return (
    <View style={ styles.container }>
      <Portal>
        <Modal
          visible={ status }
          onDismiss={ setStatus }
          contentContainerStyle={ containerStyle }>
          <View style={ styles.subContainer }>
            <View style={ styles.header }>
              <Text style={ styles.headerTitle }>
                New Contact
              </Text>
              <View style={ { margin: 10, alignSelf: "center" } }>
                <IconButton
                  onPress={ setStatus }
                  icon="close"
                  iconColor={ "#fff" }
                  size={ 20 }
                />
              </View>
            </View>
            <View style={ { margin: 10, borderWidth: .8, borderRadius: 5 } }>
              <Picker
                dropdownIconColor={ "gray" }
                style={ { borderWidth: 1, borderColor: "red", color: "gray" } }
                selectedValue={ !!formData?.selectGroup ? formData.selectGroup : null }
                onValueChange={ (itemValue, itemIndex) => OnChange("selectGroup", itemValue) }
              >
                { groups && groups.map(({ groupName, _id }) => <Picker.Item label={ groupName } value={ _id }/>) }
              </Picker>
            </View>
            <TextInput
              label="Contact Name"
              mode={ "outlined" }
              style={ { margin: 10 } }
              name={ "contactName" }
              value={ formData.contactName }
              onChangeText={ text => OnChange("contactName", text) }
            />
            <View style={ { margin: 10, borderWidth: .8, borderRadius: 5 } }>
              <Picker
                style={ { borderWidth: 1, borderColor: "red", color: "gray" } }
                selectedValue={ !!formData?.countryCode ? formData.countryCode : null }
                onValueChange={ (itemValue, itemIndex) => OnChange("countryCode", itemValue) }
              >
                <Picker.Item label="Select Country" value={ null }/>
                <Picker.Item label="pk" value="pk"/>
              </Picker>
            </View>
            <TextInput
              value={ formData.contactNumber }
              label="Contact Number"
              mode={ "outlined" }
              style={ { margin: 10 } }
              name={ "contactNumber" }
              onChangeText={ text => OnChange("contactNumber", text) }
            />
            <FAB
              uppercase={ true }
              color={ fontColor }
              label={ "Import manually" }
              style={ styles.buttons }
              onPress={ saveContact }
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
    backgroundColor: Color,
    marginHorizontal: 30,
    marginVertical: 10,
    borderRadius: 100
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
export default AddContact;
