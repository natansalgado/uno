import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { CardsContextProps } from './props';
import { Card, DrewCard, PlayedCard } from './types';
import * as actions from './actions';

interface Props {
    children: ReactNode;
}

export const CardsContext = createContext<CardsContextProps | undefined>(undefined);

export const CardsProvider = ({ children }: Props) => {
    const [drawDeck, setDrawDeck] = useState<Card[]>([]);
    const [playerDeck, setPlayerDeck] = useState<Card[]>([]);
    const [enemyDeck, setEnemyDeck] = useState<Card[]>([]);
    const [playerTurn, setPlayerTurn] = useState(true);
    const [tableDeck, setTableDeck] = useState<Card[]>([]);
    const [choosingColor, setChoosingColor] = useState(false);
    const [canDraw, setCanDraw] = useState(false);
    const [playedCard, setPlayedCard] = useState<PlayedCard | null>(null);
    const [drewCard, setDrewCard] = useState<DrewCard | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);

    function startGame() {
        setPlayedCard(null);
        setDrewCard(null);
        setChoosingColor(false);
        setIsDrawing(false);
        setWinner(null);
        actions.shuffleDrawDeck(setDrawDeck, setPlayerDeck, setEnemyDeck, setTableDeck, setPlayerTurn);
    }

    function enemyPlay() {
        actions.playEnemyCard(enemyDeck, setEnemyDeck, tableDeck, setTableDeck, setPlayerTurn, drawDeck, setDrawDeck, setIsDrawing, setPlayedCard, playerDeck, setPlayerDeck, setDrewCard)
    }

    useEffect(() => {
        if (enemyDeck.length > 0, playerDeck.length > 0 && !playerTurn && !choosingColor && !isDrawing) {
            enemyPlay();
        }
    }, [playerTurn, choosingColor, isDrawing])

    useEffect(() => {
        setTimeout(() => {
            if (tableDeck.length > 0) {
                if (playerDeck.length <= 0) setWinner("VOCÊ VENCEU!");
                if (enemyDeck.length <= 0) setWinner("VOCÊ PERDEU!");
            }
        }, 1000)
    }, [playerDeck, enemyDeck, tableDeck])

    useEffect(() => {
        setCanDraw(actions.canDraw(tableDeck, playerDeck, playedCard, isDrawing, choosingColor) && playerTurn && !isDrawing && !drewCard);
    }, [playerTurn, isDrawing, choosingColor, drewCard, playedCard]);

    useEffect(() => {
        if (drawDeck.length <= 0) setWinner("ACABOU AS CARTAS DE COMPRA!");
    }, [drawDeck, playerDeck, enemyDeck, playerTurn, tableDeck, choosingColor, canDraw, playedCard, drewCard, isDrawing, winner])

    useEffect(() => {
        startGame();
    }, [])

    const contextValue: CardsContextProps = {
        drawDeck,
        setDrawDeck,
        enemyDeck,
        setEnemyDeck,
        playerDeck,
        setPlayerDeck,
        playerTurn,
        setPlayerTurn,
        playerDraw: () => actions.playerDraw(drawDeck, playerDeck, setPlayerDeck, tableDeck, setPlayerTurn, setDrewCard),
        playPlayerCard: (card: Card) => actions.playPlayerCard(card, playerDeck, setPlayerDeck, tableDeck, setTableDeck, setPlayerTurn, setChoosingColor, setPlayedCard, drawDeck, setDrawDeck, enemyDeck, setEnemyDeck, setDrewCard, setIsDrawing),
        tableDeck,
        getLastCardInTable: () => actions.getLastCardInTable(tableDeck),
        canPlay: (card: Card) => actions.canPlay(card, tableDeck, playedCard, drewCard, isDrawing),
        choosingColor,
        setChoosingColor,
        chooseColor: (color: string) => actions.playerChooseColor(color, tableDeck, setChoosingColor),
        canDraw,
        winner,
        playedCard,
        drewCard
    };

    return (
        <CardsContext.Provider value={contextValue}>
            {children}
        </CardsContext.Provider>
    );
}