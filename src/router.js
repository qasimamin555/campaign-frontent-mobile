import { NavigationContainer }        from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component }           from 'react';
import Contact                        from './screens/contacts/contacts';
import Contacts                       from './screens/contacts/contacts';
import ImportManually                 from './screens/contacts/importManually';
import Groups                         from './screens/groups';
import MainView                       from './screens/main/main';
import SignUp                         from './screens/singUp/signup';
import Welcome                        from './screens/welcome';
import ImportContact                  from "./screens/contacts/importContact"
import { GlobalContext }              from './store';
import Message                        from "./screens/sendMessages";
import SendMessage                    from "./screens/sendMessages/sendMessage";

const Stack = createNativeStackNavigator();

class Router extends Component {
  static contextType = GlobalContext;

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={ "message" }>

          <Stack.Screen name="welcome" component={ Welcome } options={ { headerShown: false } }/>
          <Stack.Screen name="signup" component={ SignUp } options={ { headerShown: false } }/>
          <Stack.Screen name="main" component={ MainView } options={ { headerShown: false } }/>

          <Stack.Screen name={ "contacts" } component={ Contact } options={ { headerShown: false } }/>
          <Stack.Screen name={ "importContact" } component={ ImportContact } options={ { headerShown: false } }/>
          <Stack.Screen name={ "importManually" } component={ ImportManually } options={ { headerShown: false } }/>

          <Stack.Screen name={ "groups" } component={ Groups } options={ { headerShown: false } }/>

          <Stack.Screen name={ "message" } component={ Message } options={ { headerShown: false } }/>
          <Stack.Screen name={ "send" } component={ SendMessage } options={ { headerShown: false } }/>

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Router;
