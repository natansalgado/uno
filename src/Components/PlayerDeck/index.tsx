import React, { useContext } from 'react';
import { View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { PlayerCard } from '../PlayerCard';
import { CardsContext } from '../../Contexts/CardsContext'

export function PlayerDeck() {
  const cardsContext = useContext(CardsContext);

  return (
    <SafeAreaView style={styles.sav}>
      <ScrollView>
        <View style={styles.container}>
          {cardsContext?.playerDeck.map((card, index) => (
            <TouchableOpacity
              key={index}
              disabled={!cardsContext?.canPlay(card) || !cardsContext?.playerTurn}
              onPress={async () => cardsContext?.playPlayerCard(card)}>
              <PlayerCard
                cardValue={card.value}
                cardColor={card.color}
                unavailable={!cardsContext?.canPlay(card) || !cardsContext?.playerTurn}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}