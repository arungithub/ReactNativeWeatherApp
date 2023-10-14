import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appLoaded } from '../../core/redux/actions/appActions';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appLoaded());
  });

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;