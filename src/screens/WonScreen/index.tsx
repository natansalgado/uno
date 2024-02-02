import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';
import { WonScreenNavigationProp } from '../../types/navigationProps';
import { useRoute } from '@react-navigation/native';

interface Props {
  navigation: WonScreenNavigationProp;
}

interface RouteParams {
  winner?: string;
}

export function WonScreen({ navigation }: Props) {
  const route = useRoute();
  const { winner }: RouteParams = route.params || {};

  function startGame() {
    navigation.navigate('MainMenu');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{winner}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={startGame}
      >
        <Text style={styles.text}>JOGAR DE NOVO</Text>
      </TouchableOpacity>
    </View>
  );
}