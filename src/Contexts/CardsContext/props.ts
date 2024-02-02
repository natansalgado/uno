import { Card, DrewCard, PlayedCard } from "./types";

export interface CardsContextProps {
    drawDeck: Card[];
    setDrawDeck: React.Dispatch<React.SetStateAction<Card[]>>;
    playerDeck: Card[];
    setPlayerDeck: React.Dispatch<React.SetStateAction<Card[]>>;
    enemyDeck: Card[];
    setEnemyDeck: React.Dispatch<React.SetStateAction<Card[]>>;
    playerTurn: boolean;
    setPlayerTurn: React.Dispatch<React.SetStateAction<boolean>>;
    playerDraw: () => void;
    playPlayerCard: (card: Card) => void;
    tableDeck: Card[];
    getLastCardInTable: () => Card;
    canPlay: (card: Card) => boolean;
    choosingColor: boolean;
    setChoosingColor: React.Dispatch<React.SetStateAction<boolean>>;
    chooseColor: (color: string) => void;
    canDraw: boolean;
    winner: string | null;
    playedCard: PlayedCard | null;
    drewCard: DrewCard | null;
}