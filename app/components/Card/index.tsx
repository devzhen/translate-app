import { ChangeEvent } from 'react';

import { MAX_INPUT_LENGTH, MIN_INPUT_LENGTH } from '@/app/constants';
import { CardType } from '@/app/types';

import CardFooter from '../CardFooter';
import CardHeader from '../CardHeader';
import TextArea from '../TextArea';

import styles from './Card.module.css';

type CardProps = {
  type: CardType;
  badges: {
    text: string[];
    active: boolean[];
    source: string[];
  };
  onSwap: () => void;
  translate: () => void;
  input: string;
  copyText: () => void;
  getSound: () => void;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading?: boolean;
  onBadgeClick: (source: string) => void;
  isSwapDisabled?: boolean;
};

function Card(props: CardProps) {
  const {
    type,
    badges,
    onSwap,
    translate,
    input,
    copyText,
    getSound,
    onChange,
    isLoading,
    onBadgeClick,
    isSwapDisabled,
  } = props;

  return (
    <div className={styles.container} data-type={type}>
      <CardHeader
        badges={badges}
        type={type}
        onSwap={onSwap}
        onBadgeClick={onBadgeClick}
        isSwapDisabled={isSwapDisabled}
      />
      <TextArea type={type} text={input} onChange={onChange} />
      <CardFooter
        getSound={getSound}
        copyText={copyText}
        type={type}
        translate={translate}
        disabled={input.length < MIN_INPUT_LENGTH || input.length > MAX_INPUT_LENGTH}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Card;
