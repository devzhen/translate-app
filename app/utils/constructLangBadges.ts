import ramdaClone from 'ramda/src/clone';

import { CARD_TYPE } from '../constants';
import { LangDataType, BadgesType, CardType } from '../types';

export const constructInitialBadges = (langs: LangDataType): BadgesType => {
  const badges = {
    [CARD_TYPE.left]: {
      text: ['Detect Language', langs['en'].name, langs['fr'].name, langs['es'].name],
      active: [false, true, false, false],
      source: ['auto', langs['en'].source, langs['fr'].source, langs['es'].source],
    },
    [CARD_TYPE.right]: {
      text: [langs['en'].name, langs['fr'].name, langs['es'].name],
      active: [false, true, false],
      source: [langs['en'].source, langs['fr'].source, langs['es'].source],
    },
  };

  return badges;
};

export const updateBadgesActiveState = (
  type: CardType,
  source: string,
  badges: BadgesType,
): BadgesType => {
  const clone = ramdaClone(badges);

  // Find the index of selected source
  const activeCardSourceIndex = clone[type].source.findIndex((elem) => elem === source);

  // Update active index
  clone[type].active = new Array(clone[type].active.length).fill(false);
  clone[type].active[activeCardSourceIndex] = true;

  // Check for duplicates
  const oppositeCard = type === CARD_TYPE.left ? CARD_TYPE.right : CARD_TYPE.left;
  const oppositeCardSourceIndex = clone[oppositeCard].active.findIndex((elem) => elem === true);
  const oppositeCardSource = clone[oppositeCard].source[oppositeCardSourceIndex];

  // If a source and target are equal
  if (oppositeCardSource === source) {
    clone[oppositeCard].active = new Array(clone[oppositeCard].active.length).fill(false);

    // Try to choose a previous element or a next element
    const prevIndex = oppositeCardSourceIndex - 1;
    const prevSource = clone[oppositeCard].source[prevIndex];

    const oppositeCardActiveIndex =
      prevIndex < 0 || prevSource === 'auto' ? oppositeCardSourceIndex + 1 : prevIndex;

    clone[oppositeCard].active[oppositeCardActiveIndex] = true;
  }

  return clone;
};

export const swapBadges = (badges: BadgesType) => {
  const clone = ramdaClone(badges);

  const leftCard = clone[CARD_TYPE.left];
  const leftCardSourceIndex = leftCard.active.findIndex((elem) => elem === true);
  const leftCardSource = leftCard.source[leftCardSourceIndex];

  const rightCard = clone[CARD_TYPE.right];
  const rightCardSourceIndex = rightCard.active.findIndex((elem) => elem === true);
  const rightCardSource = rightCard.source[rightCardSourceIndex];

  const newLeftCardIndex = leftCard.source.findIndex((item) => item === rightCardSource);
  const newRightCardIndex = rightCard.source.findIndex((item) => item === leftCardSource);

  leftCard.active = new Array(leftCard.active.length).fill(false);
  leftCard.active[newLeftCardIndex] = true;

  rightCard.active = new Array(rightCard.active.length).fill(false);
  rightCard.active[newRightCardIndex] = true;

  return clone;
};

export const getCurrentSourceAndTarget = (badges: BadgesType) => {
  const leftCard = badges[CARD_TYPE.left];
  const sourceIndex = leftCard.active.findIndex((item) => item == true);
  const source = leftCard.source[sourceIndex];

  const rightCard = badges[CARD_TYPE.right];
  const targetIndex = rightCard.active.findIndex((item) => item == true);
  const target = rightCard.source[targetIndex];

  return {
    source,
    target,
  };
};
