import { CARD_TYPE, INITIAL_BADGES } from './constants';

export type CardType = (typeof CARD_TYPE)[keyof typeof CARD_TYPE];

export type BadgesType = (typeof INITIAL_BADGES)[keyof typeof INITIAL_BADGES];
