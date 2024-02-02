import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';
import { CardBack } from '../CardBack';
import { CardsContext } from '../../Contexts/CardsContext';

export function EnemyDeck() {
  const cardsContext = useContext(CardsContext);
  const enemyDeck = cardsContext?.enemyDeck;
  const playerTurn = cardsContext?.playerTurn;

  return (
    <View style={styles.container}>
      {enemyDeck?.map((card, index) => (
        index < 4 &&
        <View key={index} style={{ opacity: playerTurn ? 0.2 : 1 }}>
          <CardBack />
        </View>
      ))}
    </View>
  );
}