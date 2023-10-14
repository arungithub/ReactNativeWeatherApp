import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../core/redux/store';

const Forecast = () => {
  const getAppState = (state: RootState) => state.appLoaded;
  const appState = useSelector((state: RootState) => getAppState(state));

  useEffect(() => {
    console.log(appState);
  });
  return (
    <View>
      <Text>Forecast</Text>
    </View>
  );
};

export default Forecast;