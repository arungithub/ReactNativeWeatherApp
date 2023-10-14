import { View, Text, ViewStyle } from 'react-native';
import React from 'react';
import { TopBarProps } from './types';
import { useNavigation } from '@react-navigation/native';

const TopBar = ({ title }: TopBarProps) => {
  const navigation = useNavigation<any>();
  
  return (
    <View style={{
      height: 56,
      backgroundColor: 'white',
      elevation: 3,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16}}>
    <View style={{flex: 1}}>
        <Text style={{fontSize: 16, color:'black',}}>{title}</Text>
    </View>
    </View>
  );
};

export default TopBar;