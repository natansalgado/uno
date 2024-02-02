import React, { useContext, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { CardBack } from '../CardBack';
import { CardsContext } from '../../Contexts/CardsContext';

export function DrawDeck() {
  const cardsContext = useContext(CardsContext);

  function drawCard() {
    cardsContext?.playerDraw();
  };

  return (
    <TouchableOpacity
      style={{ opacity: !cardsContext?.canDraw ? 0.2 : 1 }}
      disabled={!cardsContext?.canDraw} onPress={drawCard}
    >
      <CardBack />
    </TouchableOpacity>
  );
}