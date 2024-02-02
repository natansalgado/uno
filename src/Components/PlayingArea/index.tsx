import React, { useContext } from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { PlayerCard } from '../PlayerCard';
import { CardsContext } from '../../Contexts/CardsContext';

export function PlayingArea() {
  const cardsContext = useContext(CardsContext);

  const tableDeck = cardsContext?.tableDeck;

  return (
    <>

      {tableDeck && tableDeck.length > 0 ?
        <PlayerCard
          unavailable={false}
          cardValue={tableDeck[tableDeck.length - 1].value}
          cardColor={tableDeck[tableDeck.length - 1].color}
        />
        :
        <View style={styles.container} />
      }
    </>
  );
}