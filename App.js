import React, { Component }                             from 'react';
import SplashScreen                                     from 'react-native-splash-screen'
import Router                                           from './src/router';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import GlobalState                                      from './src/store';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <GlobalState>
        <PaperProvider theme={ theme }>
          <Router/>
        </PaperProvider>
      </GlobalState>
    );
  }
}

export default App;
