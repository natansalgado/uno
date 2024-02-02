import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';

export function CardBack() {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>UNO</Text>
    </View>
  );
}