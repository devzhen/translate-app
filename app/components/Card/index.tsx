import { ChangeEvent, useState } from 'react';

import { MAX_INPUT_LENGTH, MIN_INPUT_LENGTH } from '@/app/constants';
import { BadgesType, CardType } from '@/app/types';

import CardFooter from '../CardFooter';
import CardHeader from '../CardHeader';
import TextArea from '../TextArea';

import styles from './Card.module.css';

type CardProps = {
  type: CardType;
  badges: BadgesType;
  onSwap: () => void;
  translate: (text: string) => void;
};

function Card(props: CardProps) {
  const { type, badges, onSwap, translate } = props;

  const [text, setText] = useState('Bonjour, comment allez-vous?');

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (value.length > MAX_INPUT_LENGTH) {
      e.preventDefault();

      return;
    }

    setText(value);
  };

  const translateHandler = () => {
    translate(text);
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
  };

  const getSound = () => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;

    speechSynthesis.speak(utterance);
  };

  return (
    <div className={styles.container} data-type={type}>
      <CardHeader badges={badges} type={type} onSwap={onSwap} />
      <TextArea type={type} text={text} onChange={onChangeHandler} />
      <CardFooter
        getSound={getSound}
        copyText={copyText}
        type={type}
        translate={translateHandler}
        disabled={text.length < MIN_INPUT_LENGTH || text.length > MAX_INPUT_LENGTH}
      />
    </div>
  );
}

export default Card;
