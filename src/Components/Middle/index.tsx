import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';
import { DrawDeck } from '../DrawDeck';
import { PlayingArea } from '../PlayingArea';
import { PlayedCard } from '../../Components/PlayedCard';
import { DrewCard } from '../../Components/DrewCard';

import { CardsContext } from '../../Contexts/CardsContext';

export function Middle() {
  const cardsContext = useContext(CardsContext);
  const playedCard = cardsContext?.playedCard;
  const drewCard = cardsContext?.drewCard;

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={{
          width: 80,
          height: 120,
        }} />

        <PlayingArea />

        <DrawDeck />
      </View>

      {playedCard &&
        <PlayedCard cardValue={playedCard.value} cardColor={playedCard.color} isPlayer={playedCard.isPlayer} />
      }

      {drewCard &&
        <DrewCard isPlayer={drewCard.isPlayer} />
      }
    </View>
  );
}