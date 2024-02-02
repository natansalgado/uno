import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import { styles } from './styles'
import { CardBack } from '../CardBack';

interface Props {
  isPlayer: boolean;
}

export const DrewCard = ({ isPlayer }: Props) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  const enemyAnimation = {
    transform: [
      { translateY: translateY.interpolate({ inputRange: [0, 1], outputRange: [0, -176] }) },
      { translateX: translateX.interpolate({ inputRange: [0, 1], outputRange: [0, -108] }) }
    ]
  };

  const playerAnimation = {
    transform: [
      { translateY: translateY.interpolate({ inputRange: [0, 1], outputRange: [0, 176] }) },
      { translateX: translateX.interpolate({ inputRange: [0, 1], outputRange: [0, -108] }) }
    ]
  };

  return (
    <Animated.View style={[styles.enemyCard, isPlayer ? playerAnimation : enemyAnimation]}>
      <CardBack />
    </Animated.View>
  );
};
