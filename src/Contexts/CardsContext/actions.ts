import { Dispatch, SetStateAction } from 'react';
import cards from '../../constants/cards.json';
import { Card, DrewCard, SetDrewCard } from "./types";
import { SetBool, SetCard, SetDeck } from './types';

let isPlayerChoosing = false;
let toBuy = 0;

export async function playPlayerCard(
    card: Card,
    playerDeck: Card[],
    setPlayerDeck: SetDeck,
    tableDeck: Card[],
    setTableDeck: SetDeck,
    setPlayerTurn: SetBool,
    setChoosingColor: SetBool,
    setPlayerPlayedCard: SetCard,
    drawDeck: Card[],
    setDrawDeck: SetDeck,
    enemyDeck: Card[],
    setEnemyDeck: SetDeck,
    setDrewCard: SetDrewCard,
    setIsDrawing: SetBool
) {
    const updatedPlayerDeck: Card[] = [];
    let updatedTableDeck: Card[] = [...tableDeck];

    setPlayerDeck(updatedPlayerDeck);
    setPlayerPlayedCard({ ...card, isPlayer: true });

    playerDeck.forEach(cardIn => {
        if (cardIn !== card) {
            updatedPlayerDeck.push(cardIn);
        } else {
            updatedTableDeck = [...updatedTableDeck, card];
        }
    });

    if (card.value === 'change' || card.value === '+4') isPlayerChoosing = true;

    await new Promise(resolve => setTimeout(resolve, 500));

    if (updatedPlayerDeck.length <= 0) return;

    setTableDeck(updatedTableDeck);
    setPlayerPlayedCard(null);

    if (checkIfHasDrawCard(card, enemyDeck, setPlayerTurn, true)) return;

    if (card.value === '+4') {
        await drawCards(enemyDeck, setEnemyDeck, drawDeck, setDrawDeck, setDrewCard, setIsDrawing, 4, false);
    }

    if (card.value === '+2') {
        await drawCards(enemyDeck, setEnemyDeck, drawDeck, setDrawDeck, setDrewCard, setIsDrawing, 2, false);
    }

    checkIfPlayAgain(true, card, setPlayerTurn);

    if (card.value === 'change' || card.value === '+4') {
        setChoosingColor(true);
    }
}

let isEnemyPlaying = false;

export async function playEnemyCard(
    enemyDeck: Card[],
    setEnemyDeck: SetDeck,
    tableDeck: Card[],
    setTableDeck: SetDeck,
    setPlayerTurn: SetBool,
    drawDeck: Card[],
    setDrawDeck: SetDeck,
    setIsDrawing: SetBool,
    setPlayedEnemyCard: SetCard,
    playerDeck: Card[],
    setPlayerDeck: SetDeck,
    setDrewCard: SetDrewCard
) {
    if (isEnemyPlaying || isPlayerChoosing) return;

    isEnemyPlaying = true;

    await new Promise(resolve => setTimeout(resolve, 2000));

    const tableCard = getLastCardInTable(tableDeck);
    const updatedEnemyDeck = [...enemyDeck]

    for (let i = 0; i < enemyDeck.length; i++) {
        const card: Card = enemyDeck[i];

        if (toBuy ?
            (card.value == '+4' || (card.value == '+2' && (card.color == card.color || card.value == card.value))) :
            (card.value === tableCard.value || card.color === tableCard.color || card.color === 'black')) {

            updatedEnemyDeck.splice(i, 1);

            setEnemyDeck(updatedEnemyDeck);
            setPlayedEnemyCard({ ...card, isPlayer: false });

            await new Promise(resolve => setTimeout(resolve, 500));

            setTableDeck((prev) => [...prev, card]);
            setPlayedEnemyCard(null);

            if (updatedEnemyDeck.length <= 0) return;

            if (checkIfHasDrawCard(card, playerDeck, setPlayerTurn, false)) return;

            if (card.value === '+4') {
                await drawCards(playerDeck, setPlayerDeck, drawDeck, setDrawDeck, setDrewCard, setIsDrawing, 4, true);
            }

            if (card.value === '+2') {
                await drawCards(playerDeck, setPlayerDeck, drawDeck, setDrawDeck, setDrewCard, setIsDrawing, 2, true);
            }

            if (card.value === '+4' || card.value === 'change') {
                card.color = chooseEnemyColor(updatedEnemyDeck);
            }

            checkIfPlayAgain(false, card, setPlayerTurn);

            isEnemyPlaying = false;

            return;
        }
    }

    isEnemyPlaying = false;

    await enemyDraw(drawDeck, setDrawDeck, updatedEnemyDeck, setEnemyDeck, tableDeck, setPlayerTurn, setDrewCard);
}

function checkIfHasDrawCard(card: Card, cards: Card[], setPlayerTurn: Dispatch<SetStateAction<boolean>>, isPlayerTurn: boolean) {
    if (card.value === '+4' || card.value === '+2') {
        toBuy += Number(card.value.replace('+', ''));

        for (let i = 0; i < cards.length; i++) {
            const currentCard = cards[i];

            if (currentCard.value == '+4' || (currentCard.value == '+2' && (currentCard.color == card.color || currentCard.value == card.value))) {

                if (isPlayerTurn) {
                    isPlayerChoosing = false;
                    setPlayerTurn(false);
                } else {
                    isEnemyPlaying = false;
                    setPlayerTurn(true);
                }

                return true;
            }
        }
    }

    return false;
}

export function playerChooseColor(color: string, tableDeck: Card[], setChoosingColor: SetBool) {
    if (tableDeck && tableDeck.length > 0) {
        setChoosingColor(false);
        isPlayerChoosing = false;
        tableDeck[tableDeck?.length - 1].color = color;
    }
}

function chooseEnemyColor(enemyDeck: Card[]) {
    const countColors: any = {};

    enemyDeck.forEach(card => {
        const color = card.color;

        if (card.color !== 'black') {
            if (countColors[color]) {
                countColors[color]++;
            } else {
                countColors[color] = 1;
            }
        }
    });

    let mostFrequentlyColor = '';
    let mostFrequentlyCount = 0;

    for (const color in countColors) {
        if (countColors[color] > mostFrequentlyCount) {
            mostFrequentlyColor = color;
            mostFrequentlyCount = countColors[color];
        }
    }


    if (mostFrequentlyColor) {
        return mostFrequentlyColor;
    }

    const colors = ["blue", "yellow", "red", "green"];
    const randomIndex = Math.floor(Math.random() * colors.length);

    return colors[randomIndex];

}

function checkIfPlayAgain(isPlayer: boolean, card: Card, setPlayerTurn: SetBool) {
    switch (card.value) {
        case "+4":
        case "+2":
        case "invert":
        case "block":
            setPlayerTurn(true)
            !isPlayer && setPlayerTurn(false);
            break;
        default:
            isPlayer ? setPlayerTurn(false) : setPlayerTurn(true);
            break;
    }
}

async function drawCards(
    deck: Card[],
    setDeck: SetDeck,
    drawDeck: Card[],
    setDrawDeck: SetDeck,
    setDrewCard: SetDrewCard,
    setIsDrawing: SetBool,
    quantity: number,
    isPlayer: boolean,
) {
    const updatedDeck = [...deck];
    const updatedDrawDeck = [...drawDeck];

    setIsDrawing(true);

    const rightQuantity = toBuy ? toBuy : quantity;

    for (let i = 0; i < rightQuantity; i++) {
        await new Promise(resolve => setTimeout(resolve, 400));

        const randomNum = Math.floor(Math.random() * updatedDrawDeck.length);
        const drewCard = updatedDrawDeck[randomNum];

        updatedDrawDeck.splice(randomNum, 1);
        setDrewCard({ isPlayer });

        await new Promise(resolve => setTimeout(resolve, 450));
        setDrawDeck(updatedDrawDeck);
        updatedDeck.push(drewCard);

        setDrewCard(null);
        setDeck(updatedDeck);
    }

    toBuy = 0;
    setIsDrawing(false);
}

export async function playerDraw(
    drawDeck: Card[],
    playerDeck: Card[],
    setPlayerDeck: SetDeck,
    tableDeck: Card[],
    setPlayerTurn: SetBool,
    setDrewCard: SetDrewCard,
) {
    if (drawDeck.length <= 0) return;

    setDrewCard({ isPlayer: true });

    let updatedPlayerCards = [...playerDeck];

    const randomNum = Math.floor(Math.random() * drawDeck.length);
    const drewCard = drawDeck[randomNum]

    await new Promise(resolve => setTimeout(resolve, 450));

    if (drewCard !== undefined) {
        updatedPlayerCards.push(drewCard);
        drawDeck.splice(randomNum, 1);

        setPlayerDeck(updatedPlayerCards);

        if (canPlay(drewCard, tableDeck)) {
            setPlayerTurn(true);
        } else {
            setPlayerTurn(false);
        }
    }

    setDrewCard(null);
};

export async function enemyDraw(
    drawDeck: Card[],
    setDrawDeck: SetDeck,
    updatedEnemyDeck: Card[],
    setEnemyDeck: SetDeck,
    tableDeck: Card[],
    setPlayerTurn: SetBool,
    setDrewCard: SetDrewCard
) {
    if (drawDeck.length <= 0) return;

    setDrewCard({ isPlayer: false });

    const updatedDrawDeck = [...drawDeck];

    const randomNum = Math.floor(Math.random() * updatedDrawDeck.length);
    const drewCard = updatedDrawDeck[randomNum]

    await new Promise(resolve => setTimeout(resolve, 450));

    updatedEnemyDeck.push(drewCard);
    updatedDrawDeck.splice(randomNum, 1);

    setEnemyDeck(updatedEnemyDeck);

    if (canPlay(drewCard, tableDeck)) {
        setPlayerTurn(true);
        setPlayerTurn(false);
    } else {
        setPlayerTurn(true);
    }

    setDrawDeck(updatedDrawDeck);
    setDrewCard(null);
}

export function shuffleDrawDeck(
    setDrawDeck: SetDeck,
    setPlayerDeck: SetDeck,
    setEnemyDeck: SetDeck,
    setTableDeck: SetDeck,
    setPlayerTurn: SetBool
) {
    isEnemyPlaying = false;
    isPlayerChoosing = false;
    toBuy = 0;

    const allCards = JSON.parse(JSON.stringify(cards));
    const updatedDrawDeck = [];

    for (let i = 0; i < 68; i++) {
        const randomNum = Math.floor(Math.random() * allCards.length);
        updatedDrawDeck.push(allCards[randomNum]);
        allCards.splice(randomNum, 1);
    }

    setDrawDeck(updatedDrawDeck);
    givePlayerCards(updatedDrawDeck, setDrawDeck, setPlayerDeck, setEnemyDeck);
    setTableDeck([]);
    setPlayerTurn(true);
}

export function givePlayerCards(updatedDrawDeck: Card[], setDrawDeck: SetDeck, setPlayerDeck: SetDeck, setEnemyDeck: SetDeck) {
    let updatedPlayerDeck: Card[] = [];

    for (let i = 0; i < 7; i++) {
        const randomNum = Math.floor(Math.random() * updatedDrawDeck.length);
        updatedPlayerDeck.push(updatedDrawDeck[randomNum]);
        updatedDrawDeck.splice(randomNum, 1);
    }

    setPlayerDeck(updatedPlayerDeck);
    giveEnemyCards(updatedDrawDeck, setDrawDeck, setEnemyDeck);
}

export function giveEnemyCards(updatedDrawDeck: Card[], setDrawDeck: SetDeck, setEnemyDeck: SetDeck) {
    let updatedEnemyDeck: Card[] = [];

    for (let i = 0; i < 7; i++) {
        const randomNum = Math.floor(Math.random() * updatedDrawDeck.length);
        updatedEnemyDeck.push(updatedDrawDeck[randomNum]);
        updatedDrawDeck.splice(randomNum, 1);
    }

    setDrawDeck(updatedDrawDeck);
    setEnemyDeck(updatedEnemyDeck);
}

export function getLastCardInTable(tableDeck: Card[]) {
    return tableDeck[tableDeck.length - 1];
}

export function canPlay(card: Card, tableDeck: Card[], playerPlayedCard?: Card | null, drewCard?: DrewCard | null, isDrawing?: boolean) {
    const cardInTable = getLastCardInTable(tableDeck);

    if (toBuy && !isDrawing) {
        if (card.value == '+4' || (card.value == '+2' && (card.value == cardInTable.value || card.color == cardInTable.color))) return true;
        else return false;
    }

    if (playerPlayedCard || drewCard || isDrawing) return false;

    if (tableDeck && tableDeck.length <= 0) return true;

    if (card.color === 'black') return true;

    if (card.value === cardInTable?.value || card.color === cardInTable?.color) {
        return true;
    }

    return false;
}

export function canDraw(tableDeck: Card[], playerDeck: Card[], playerPlayedCard: Card | null, isDrawing: boolean, choosingColor: boolean) {
    if (tableDeck.length <= 0 || playerPlayedCard || isDrawing || choosingColor || isEnemyPlaying) return false;

    let needToReturn = false;

    const cardInTable = getLastCardInTable(tableDeck);

    playerDeck.forEach(card => {
        if (card.value === cardInTable.value || card.color === cardInTable.color || card.color === 'black') {
            needToReturn = true;
        }
    });

    if (needToReturn) return false;

    return true;
}