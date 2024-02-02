import { View, TouchableOpacity, Text, Image } from 'react-native';
import { styles } from './styles';
import { MainMenuNavigationProp } from '../../types/navigationProps';

import logo from '../../../assets/uno-logo2.png';

interface MainMenuProps {
  navigation: MainMenuNavigationProp;
}

export function MainMenu({ navigation }: MainMenuProps) {
  function startGame() {
    navigation.navigate('GameScreen');
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>UNO</Text> */}
      <Image source={logo} style={styles.image} />
      <TouchableOpacity
        style={styles.button}
        onPress={startGame}
      >
        <Text style={styles.text}>START GAME</Text>
      </TouchableOpacity>
    </View>
  );
}