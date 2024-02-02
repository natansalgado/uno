import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

interface Props {
    cardValue: string;
    cardColor: string;
    unavailable: boolean;
}

export function PlayerCard({ cardValue, cardColor, unavailable }: Props) {

    function loadValue() {
        switch (cardValue) {
            case 'invert':
                return <MaterialCommunityIcons name='rotate-3d-variant' size={50} />
            case 'block':
                return <MaterialCommunityIcons name='block-helper' size={40} />
            case 'change':
                return <Ionicons name="color-palette-outline" size={46} />
            default:
                return cardValue
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: cardColor, opacity: unavailable ? 0.2 : 1 }]}>
            <Text style={styles.text}>
                {loadValue()}
            </Text>
        </View>
    );
}