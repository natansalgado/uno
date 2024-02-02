import { Dispatch, SetStateAction } from "react";

export interface Card {
    value: string;
    color: string;
}

export type SetDeck = Dispatch<SetStateAction<Card[]>>;

export type SetBool = Dispatch<SetStateAction<boolean>>;

export type SetCard = Dispatch<SetStateAction<PlayedCard | null>>;

export type SetDrewCard = Dispatch<SetStateAction<DrewCard | null>>;

export interface PlayedCard extends Card {
    isPlayer: boolean;
}

export interface DrewCard {
    isPlayer: boolean;
}