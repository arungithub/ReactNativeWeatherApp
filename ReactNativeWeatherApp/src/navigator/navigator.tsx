import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from '../screens/home/home';
import Forecast from '../screens/forecast/forecast'

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
  return (
    <NavigationContainer>
      <SafeAreaView edges={['left']} style={{flex: 1}}>
        <RootStackNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default Navigator;