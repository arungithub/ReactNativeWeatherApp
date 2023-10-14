import { View, Text, ViewStyle } from 'react-native';
import React from 'react';
import { TopBarProps } from './types';
import { useNavigation } from '@react-navigation/native';
import Styles from '../../styles/styles';

const TopBar = ({ title }: TopBarProps) => {
  const navigation = useNavigation<any>();
  
  return (
    <View style={[Styles.topBarContainer as ViewStyle]}>
    <View style={[Styles.flex1]}>
        <Text style={[Styles.heading]}>{title}</Text>
    </View>
    </View>
  );
};

export default TopBar;
