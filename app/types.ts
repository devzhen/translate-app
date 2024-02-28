import { CARD_TYPE } from './constants';

export type CardType = (typeof CARD_TYPE)[keyof typeof CARD_TYPE];
