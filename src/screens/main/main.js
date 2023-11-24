import React                                                              from 'react';
import { Appbar, Avatar, MD3Colors, IconButton, FAB, Icon, Card, Button } from 'react-native-paper';
import { StyleSheet, View, Text, Touchable, TouchableOpacity, Image }     from "react-native";
import { Color }                                                          from '../../assets/themeColor';
import BottomNavigationComponent                                          from '../../components/bottomNavigation';


const LeftContent = props => <Avatar.Icon { ...props } icon="folder"/>

const MainView = (props) => {
  const { navigation } = props;
  return (
    <React.Fragment>
      <BottomNavigationComponent navigation={ navigation }/>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  header: {
    backgroundColor: "#CF1000",
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitleText: {
    fontSize: 10,
    color: "#000",
    marginHorizontal: 10,
    width: "80%",
    textAlign: 'center'
  },
  menu: {
    margin: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  text: {
    color: "#000",
    fontWeight: "600",
    textAlign: 'center',
    marginTop: 5,
  },
  submenu: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-between',

    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 20,
    margin: 5,
  },
  profile: {
    height: 75,
    backgroundColor: "#000000",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // padding:10
  },
  icon: {
    backgroundColor: "#CF1000",
    borderRadius: 20,
    height: 65,
    width: 65,
    marginHorizontal: 20,
    marginVertical: 10
  },

  icon_b: {
    borderColor: "#CF1000",
    borderWidth: 1,
    borderRadius: 20,
    height: 65,
    width: 65,
    marginHorizontal: 20,
    marginVertical: 10
  },

  image: {
    alignSelf: "center",
    marginTop: 4
  },
  main: {
    marginVertical: 10
  },
  heading: {
    fontSize: 22,
    fontFamily: "serif",
    color: "#fff",
    marginHorizontal: 10,
    alignSelf: "center"
  },
  headingTitle: {
    fontSize: 14,
    fontFamily: "serif",
    color: "#F5F5F5",
    marginHorizontal: 10,
    alignSelf: "center"
  }
})
export default MainView

//   <View style={ styles.menu }>
//         <View style={ styles.submenu }>
//
//           <View style={ { width: "30%" } }>
//             <TouchableOpacity onPress={ () => navigation.navigate("contacts") } style={ styles.fab }>
//               <IconButton iconColor={ "#CF1000" } size={ 40 } icon={ "book" }/>
//             </TouchableOpacity>
//             <Text style={ styles.text }>
//               Contacts
//             </Text>
//           </View>
//
//           <View style={ { width: "30%" } }>
//             <TouchableOpacity style={ styles.fab }>
//               <IconButton iconColor={ "#CF1000" } size={ 40 } icon={ "bullhorn" }/>
//             </TouchableOpacity>
//             <Text style={ styles.text }>
//               New Campaign
//             </Text>
//           </View>
//
//           <View style={ { width: "30%" } }>
//             <TouchableOpacity style={ styles.fab }>
//               <IconButton iconColor={ "#CF1000" } size={ 40 } icon={ "group" }/>
//             </TouchableOpacity>
//             <Text style={ styles.text }>
//               Group Grabber
//             </Text>
//           </View>
//
//           <View style={ { width: "30%" } }>
//             <TouchableOpacity style={ styles.fab }>
//               <IconButton iconColor={ "#CF1000" } size={ 40 } icon={ "send" }/>
//             </TouchableOpacity>
//             <Text style={ styles.text }>
//               Super Group Sender
//             </Text>
//           </View>
//
//           <View style={ { width: "30%" } }>
//             <TouchableOpacity style={ styles.fab }>
//               <IconButton iconColor={ "#CF1000" } size={ 40 } icon={ "adjust" }/>
//             </TouchableOpacity>
//             <Text style={ styles.text }>
//               B2B Lead Extractor
//             </Text>
//           </View>
//
//           <View style={ { width: "30%" } }>
//             <TouchableOpacity style={ styles.fab }>
//               <IconButton iconColor={ "#CF1000" } size={ 40 } icon={ "book" }/>
//             </TouchableOpacity>
//             <Text style={ styles.text }>
//               Development
//             </Text>
//           </View>
//
//           <View style={ { width: "30%" } }>
//             <TouchableOpacity style={ styles.fab }>
//               <IconButton iconColor={ "#CF1000" } size={ 40 } icon={ "send" }/>
//             </TouchableOpacity>
//             <Text style={ styles.text }>
//               Start Bulk Sending
//             </Text>
//           </View>
//
//           <View style={ { width: "30%" } }>
//             <TouchableOpacity style={ styles.fab }>
//               <IconButton iconColor={ "#CF1000" } size={ 40 } icon={ "message" }/>
//             </TouchableOpacity>
//             <Text style={ styles.text }>
//               Scheduled Message
//             </Text>
//           </View>
//
//           <View style={ { width: "30%" } }>
//             <TouchableOpacity style={ styles.fab }>
//               <IconButton iconColor={ "#CF1000" } size={ 40 } icon={ "history" }/>
//             </TouchableOpacity>
//             <Text style={ styles.text }>
//               Sent History
//             </Text>
//           </View>
//
//           <View style={ { width: "30%" } }>
//             <TouchableOpacity style={ styles.fab }>
//               <IconButton iconColor={ "#CF1000" } size={ 40 } icon={ "alert" }/>
//             </TouchableOpacity>
//             <Text style={ styles.text }>
//               Business Card Share
//             </Text>
//           </View>
//
//           <View style={ { width: "30%" } }>
//             <TouchableOpacity style={ styles.fab }>
//               <IconButton iconColor={ "#CF1000" } size={ 40 } icon={ "alert" }/>
//             </TouchableOpacity>
//             <Text style={ styles.text }>
//               Unsubscribes List
//             </Text>
//           </View>
//
//           <View style={ { width: "30%" } }>
//             <TouchableOpacity style={ styles.fab }>
//               <IconButton iconColor={ "#CF1000" } size={ 40 } icon={ "alert" }/>
//             </TouchableOpacity>
//             <Text style={ styles.text }>
//               Refer & Earn
//             </Text>
//           </View>
//
//         </View>
//       </View>
