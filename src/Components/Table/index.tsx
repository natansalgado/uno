import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';
import { Middle } from '../../Components/Middle';
import { PlayerDeck } from '../../Components/PlayerDeck';
import { EnemyDeck } from '../../Components/EnemyDeck';
import { ChooseColor } from '../../Components/ChooseColor';
import { CardsContext } from '../../Contexts/CardsContext';

import { GameScreenNavigationProp } from '../../types/navigationProps';
import { RotatingCircle } from '../RotatingCircle';

interface TableProps {
    navigation: GameScreenNavigationProp;
}

export function Table({ navigation }: TableProps) {
    const cardsContext = useContext(CardsContext);

    if (cardsContext?.winner) {
        setTimeout(() => {
            cardsContext?.winner && navigation.navigate('WonScreen', { winner: cardsContext?.winner });
        }, 10)
        return <View />;
    }

    return (
        <View style={styles.container}>

            <EnemyDeck />

            <Middle />

            <PlayerDeck />

            <Text style={styles.text}>{cardsContext?.enemyDeck.length}</Text>

            <View style={[styles.rotatingCircle, { opacity: cardsContext?.playerTurn ? 0 : 1 }]}>
                <RotatingCircle />
            </View>

            {cardsContext?.choosingColor &&
                <ChooseColor />
            }
        </View>
    );
}