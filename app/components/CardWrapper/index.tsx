'use client';

import { useState } from 'react';

import { CARD_TYPE, INITIAL_BADGES } from '@/app/constants';

import Card from '../Card';

import styles from './CardWrapper.module.css';

function CardWrapper() {
  const [badges] = useState(INITIAL_BADGES);

  const onSwapHandler = () => {};
  const translateHandler = () => {};

  return (
    <div className={styles.container}>
      <Card
        type={CARD_TYPE.left}
        badges={badges[CARD_TYPE.left]}
        onSwap={onSwapHandler}
        translate={translateHandler}
      />
      <Card
        type={CARD_TYPE.right}
        badges={badges[CARD_TYPE.right]}
        onSwap={onSwapHandler}
        translate={translateHandler}
      />
    </div>
  );
}

export default CardWrapper;
