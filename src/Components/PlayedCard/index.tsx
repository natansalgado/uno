import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import { styles } from './styles'
import { PlayerCard } from '../PlayerCard';

interface Props {
  cardValue: string;
  cardColor: string;
  isPlayer: boolean;
}

export const PlayedCard = ({ cardValue, cardColor, isPlayer }: Props) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 1,
      duration: 450,
      useNativeDriver: true,
    }).start();
  }, []);

  const enemyAnimation = {
    transform: [{ translateY: translateY.interpolate({ inputRange: [0, 1], outputRange: [-185, 0] }) }],
  };

  const playerAnimation = {
    transform: [{ translateY: translateY.interpolate({ inputRange: [0, 1], outputRange: [185, 0] }) }],
  };

  return (
    <Animated.View style={[styles.enemyCard, isPlayer ? playerAnimation : enemyAnimation]}>
      <PlayerCard
        cardValue={cardValue}
        cardColor={cardColor}
        unavailable={false}
      />
    </Animated.View>
  );
};
