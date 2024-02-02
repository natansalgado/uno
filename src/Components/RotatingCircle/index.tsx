import React from 'react';
import { Animated, Easing } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons'

export function RotatingCircle() {
  const rotateValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.linear
    })
  ).start();

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <FontAwesome6
        name="arrows-rotate"
        size={40}
        color="white"
      />
    </Animated.View >
  );
}