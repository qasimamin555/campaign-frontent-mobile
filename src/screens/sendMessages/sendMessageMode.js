import React                                    from 'react';
import { View, StyleSheet }                     from 'react-native';
import { FAB, Modal, Text, IconButton, Portal } from 'react-native-paper';
import { fontColor, Color }                     from '../../assets/themeColor';

function SendMessageMode(props) {
  const containerStyle = { backgroundColor: 'white', margin: 30, borderRadius: 10 };
  const { status, onOpen, onClose, navigation, selectedContacts } = props;

  return (
    <React.Fragment>
      <Portal>
        <Modal
          visible={ status }
          onDismiss={ onClose }
          contentContainerStyle={ containerStyle }
        >
          <View style={ styles.subContainer }>
            <View style={ styles.header }>
              <Text style={ styles.headerTitle }>
                Send Options
              </Text>
              <View style={ { margin: 10, alignSelf: "center" } }>
                <IconButton
                  onPress={ onClose }
                  icon="close"
                  iconColor={ "#fff" }
                  size={ 20 }
                />
              </View>
            </View>
            <FAB
              uppercase={ true }
              color={ fontColor }
              label={ "general mode" }
              style={ styles.buttons }
              onPress={ () => {
                onClose();
                navigation.navigate("send", {
                  data: selectedContacts
                });
              } }
            />
            <FAB
              uppercase={ true }
              color={ fontColor }
              label={ "advanced mode" }
              style={ styles.buttons }
              onPress={ () => {
                onClose();
                navigation.navigate("send", {
                  data: selectedContacts
                });
              } }
            />
            <View style={ { margin: 20 } }>
              <Text style={ { color: "gray" } }>
                General Mode : Used to send text message or
                image with caption to save contacts.
              </Text>
              <Text style={ { marginTop: 10, color: "gray" } }>
                Advance Mode : Used to send text message with
                Multiple files to unknown numbers.
              </Text>
            </View>
          </View>
        </Modal>
      </Portal>

      <FAB
        color={ fontColor }
        label={ "Next" }
        icon="arrow-right"
        style={ styles.fab }
        onPress={ onOpen }
      />
    </React.Fragment>
  );
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
export default SendMessageMode;
