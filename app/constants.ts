export const SYSTRAN_ENDPOINT = 'https://api-translate.systran.net/translation';
export const SYSTRAN_KEY = process.env.SYSTRAN_KEY;

export const CARD_TYPE = {
  left: 'left',
  right: 'right',
} as const;

export const MIN_INPUT_LENGTH = 3;
export const MAX_INPUT_LENGTH = 500;
export const INPUT_DEBOUNCE = 500;

export const INITIAL_TRANSLATION_STATE = {
  input: 'Hello, how are you',
  translation: 'Bonjour, comment allez-vous ?',
};
