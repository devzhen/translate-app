import { v4 as uuid } from 'uuid';

export const CARD_TYPE = {
  left: 'left',
  right: 'right',
} as const;

export const INITIAL_BADGES = {
  [CARD_TYPE.left]: [
    { id: uuid(), text: 'English', isActive: true },
    { id: uuid(), text: 'French', isActive: false },
    { id: uuid(), text: 'Spanish', isActive: false },
  ],
  [CARD_TYPE.right]: [
    { id: uuid(), text: 'English', isActive: false },
    { id: uuid(), text: 'French', isActive: true },
    { id: uuid(), text: 'Spanish', isActive: false },
  ],
} as const;

export const MIN_INPUT_LENGTH = 3;
export const MAX_INPUT_LENGTH = 500;
