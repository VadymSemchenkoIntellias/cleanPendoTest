import React, {useRef} from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {withPendoRN} from 'rn-pendo-sdk';

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {PendoSDK, NavigationLibraryType} from 'rn-pendo-sdk';

function initPendo() {
  const navigationOptions = {
    library: NavigationLibraryType.ReactNavigation,
    navigation: null,
  };
  const pendoKey =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6IiIsInR5cCI6IkpXVCJ9.eyJkYXRhY2VudGVyIjoiZXUiLCJrZXkiOiI4Yzk4ZjZkM2JkMzJhOTAwYzdhM2ZjNWE2Y2Q0MWU4NzU0MTIwNWFiY2RkOGQ5YzRlNTJmZmIyODc2Yzc1MDdkNDgwZWE5OTdkYzY2ODQ3NDJkYzA0YmNjM2ZlYWNiOGQ3MzNiNDlhMzg5NmUxZWM5ZDIyZWQxNzUxYWQzYzc4NDNlNzFiYjRmMTljY2U3ZThiY2U2NjkyYmVjZGQzMmYyZDE0NmU0MDc3ODg0OWI3MjUzYzBmMWUwYjE5NjY3ZWM4ZGM5MTU3NjM4OWEwZjFkNjU0NmMzNTk1YmQ5MjNmZS5lMzYwZDA4MjY1MmJkNmI2YWE0NTBiZmJiMjcxZjZjYi5lNzkwNmU2ODIxM2JjMTUyOTIzMTc5MWE3NjA3ZWFhY2VhNjNmZjk4ZDQ0MTQ1YWI3ZGQwYjQ2ZTBhOTkxZGExIn0.f0e_LkZEG6RfeylZnm4tzeuyxU8V8dKBnRRI8KzjJCzNNow6ASyamgF954GeseksUWpu11TZvdHggYLwnlhGZN3UkfOUrW7flfDhiIWbpBYhqC51XT7E1bvQpUYN3tUHUmrPMNy8DhBHD7VyVTQ8fEGmp-rX1sNtKCmW3taaSA8';
  PendoSDK.setup(pendoKey, navigationOptions);
}
initPendo();

const visitorId = 'VISITOR-UNIQUE-ID';
const accountId = 'ACCOUNT-UNIQUE-ID';
const visitorData = {Age: '25', Country: 'USA'};
const accountData = {Tier: '1', Size: 'Enterprise'};

PendoSDK.startSession(visitorId, accountId, visitorData, accountData);

const Stack = createStackNavigator();

const ScreenA = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('B')}
        style={{width: 20, height: 20, backgroundColor: 'yellow'}}
        nativeID="A"
      />
    </SafeAreaView>
  );
};

const ScreenB = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('A')}
        style={{width: 20, height: 20, backgroundColor: 'yellow'}}
        nativeID="B"
      />
    </SafeAreaView>
  );
};

const App = props => {
  const navigationRef = useRef();
  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={() => {
        const state = navigationRef.current.getRootState();
        props.onStateChange(state);
      }}
      onReady={() => {
        const state = navigationRef.current.getRootState();
        props.onStateChange(state);
      }}>
      <Stack.Navigator initialRouteName="A">
        <Stack.Screen name="A" component={ScreenA} />
        <Stack.Screen name="B" component={ScreenB} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default withPendoRN(App, {nativeIDs: ['A', 'B']});
