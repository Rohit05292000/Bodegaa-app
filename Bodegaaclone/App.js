import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';

function App() {
  return (
    <SafeAreaProvider>
       <Provider store={store}>
      <AppNavigator/>
      <Toast />
      </Provider> 
    </SafeAreaProvider>
  );
}

export default App;
