import { CardsProvider } from '../../Contexts/CardsContext';
import { Table } from '../../Components/Table';
import { GameScreenNavigationProp } from '../../types/navigationProps';

interface GameScreenProps {
  navigation: GameScreenNavigationProp;
}

export function GameScreen({ navigation }: GameScreenProps) {
  return (
    <CardsProvider>
      <Table navigation={navigation} />
    </CardsProvider>
  );
}