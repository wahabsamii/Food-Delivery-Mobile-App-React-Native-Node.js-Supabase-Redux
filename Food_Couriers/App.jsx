import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Pop from './src/screens/Pop';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import MainDrawer from './src/navigation/MainDrawe';
import ProductDetails from './src/screens/ProductDetails';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Pop" component={Pop} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />

          {/* ✅ AFTER LOGIN */}
          <Stack.Screen name="MainApp" component={MainDrawer} />
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;


// import { View, Text } from 'react-native'
// import React from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import { SafeAreaProvider } from 'react-native-safe-area-context'; // 👈 Add this
// import Pop from './src/screens/Pop'
// import Login from './src/screens/Login'
// import Register from './src/screens/Register';
// import MainDrawe from './src/navigation/MainDrawe';
// import TabNav from './src/navigation/TabNav';

// // ✅ MOVE THIS OUTSIDE THE COMPONENT
// const Stack = createNativeStackNavigator();

// const App = () => {
//   return (
//     <SafeAreaProvider>
//     <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name='Pop' component={Pop} options={{headerShown: false}}/>
//           <Stack.Screen name='Login' component={Login} />
//           <Stack.Screen name='Register' component={Register} />
//           <Stack.Screen name='Landing' component={TabNav} options={{headerShown: false}}/>
//           <Stack.Screen name='DraMain' component={MainDrawe} options={{headerShown: false}}/>
//         </Stack.Navigator>
//     </NavigationContainer>
//     </SafeAreaProvider>
//   )
// }

// export default App