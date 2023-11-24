import { Picker }                            from '@react-native-picker/picker';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import React, { useContext }                 from "react";
import { Appbar, IconButton, FAB }           from 'react-native-paper';
import { AddGroup }                          from '../../actions';
import { Color, fontColor }                  from '../../assets/themeColor';
import { GlobalContext }                     from '../../store';

const ImportManually = ({ navigation }) => {
  const [globalState, dispatch] = useContext(GlobalContext);
  const { groups } = globalState;

  const AddGroup = () => {

  }

  const handleTextLayout = (event) => {
    const { lines } = event.nativeEvent;

    // Check if there is more than one line
    console.log(lines, "$$$$$$$$$$$$$$")
  };

  return (
    <React.Fragment>
      <Appbar.Header style={ styles.header }>
        <Appbar.BackAction onPress={ () => navigation.goBack() } color={ "#fff" }/>
        <Appbar.Content style={ { alignItems: 'flex-start' } } color={ "#fff" } title="Import Manually"/>
      </Appbar.Header>

      <View style={ styles.container }>
        <TextInput
          style={ { borderWidth: 1, borderColor: Color } }
          onLayout={ handleTextLayout }
          mode={ "outlined" }
          multiline={ true }
          numberOfLines={ 10 }
          placeholder={ "+92xxxxxxxxx \n +1xxxxx ..." }
        />
        <Text style={ { color: "#000", marginTop: 10 } }>
          Paste Contacts in given formats. One number in
          one line
        </Text>
        <View style={ styles.selector }>
          <View
            style={ { width: "100%", marginVertical: 10, borderWidth: 1, borderColor: "#CF1000", borderRadius: 5 } }>
            <Picker
              style={ { borderWidth: 1, borderColor: "red" } }
              // selectedValue={ selectedLanguage }
              // onValueChange={ (itemValue, itemIndex) =>
              //   setSelectedLanguage(itemValue)
              // }
            >
              { groups.length > 0
                && groups.map(({ groupName }, key) =>
                  <Picker.Item key={ key } label={ groupName } value={ groupName }/>) }
            </Picker>
          </View>
          {/*<IconButton onPress={ AddGroup} iconColor={ fontColor } style={ styles.button } icon={ "plus" } size={ 35 }/>*/ }
        </View>
      </View>
      <FAB
        color={ fontColor }
        label={ "Import Manually" }
        style={ styles.fab }
        onPress={ () => alert("Under development") }
      />
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color,
  },
  container: {
    margin: 25,
    borderRadius: 10,
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
  selector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  button: {
    backgroundColor: Color,
  }
})
export default ImportManually;
