import { CARD_TYPE } from './constants';

export type CardType = (typeof CARD_TYPE)[keyof typeof CARD_TYPE];

export type LangDataType = Record<string, { name: string; pairs: string[]; source: string }>;

export type BadgeType = {
  text: string;
  isActive: boolean;
  type: 'button' | 'dropdown';
  source: string;
};

export type BadgesType = {
  [CARD_TYPE.left]: {
    text: string[];
    active: boolean[];
    source: string[];
  };
  [CARD_TYPE.right]: {
    text: string[];
    active: boolean[];
    source: string[];
  };
};
