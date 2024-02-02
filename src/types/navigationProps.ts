import { NavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';

export type MainMenuNavigationProp = StackNavigationProp<RootStackParamList, 'MainMenu'>;
export type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GameScreen'>;
export type WonScreenNavigationProp = StackNavigationProp<RootStackParamList, 'WonScreen'>;