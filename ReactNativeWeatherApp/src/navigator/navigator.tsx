import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/home/home';
import Forecast from '../screens/forecast/forecast';
import { Alert, Image, View } from 'react-native';
import Styles from '../styles/styles';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch } from '../hooks';
import { GeolocationResponse } from '@react-native-community/geolocation';
import { clearCurrentLocation, updateCurrentLocation } from '../core/redux/actions/appActions';
import { requestLocationAccess, getCurrentLocation, locationConfig } from '../features/geoLocation/geoLocation';

const Stack = createStackNavigator();

const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Forecast" component={Forecast}/>
    </Stack.Navigator>
  );
};

const Navigator = () => {
  const dispatch = useAppDispatch();

  const getPosition = async () => {
    try {
      const isLocationPermissionEnabled = await requestLocationAccess();
      if (isLocationPermissionEnabled) {
        dispatch(clearCurrentLocation());
        const position = (await getCurrentLocation()) as GeolocationResponse;
        dispatch(updateCurrentLocation(position));
        return position;
      }
    } catch (e) {
      Alert.alert(
        'Weather App',
        'Somthing went wrong. Please make sure your location services enabled and permission',
      );
    }
  };

  useEffect(() => {
    locationConfig();
    getPosition();
  });

  return (
    <NavigationContainer>
      <SafeAreaView edges={['left']} style={[Styles.flex1]}>
        <RootStackNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default Navigator;
