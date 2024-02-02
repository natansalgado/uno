import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainMenu } from '../screens/MainMenu';
import { GameScreen } from '../screens/GameScreen';
import { WonScreen } from '../screens/WonScreen';

const { Navigator, Screen } = createStackNavigator();

export function Stack() {
    return (
        <Navigator initialRouteName='MainMenu' screenOptions={{ headerShown: false }}>
            <Screen name='MainMenu' component={MainMenu} />
            <Screen name='GameScreen' component={GameScreen} />
            <Screen name='WonScreen' component={WonScreen} />
        </Navigator>
    );
}