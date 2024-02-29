import { ChangeEvent } from 'react';

import { CARD_TYPE, MAX_INPUT_LENGTH } from '@/app/constants';
import { CardType } from '@/app/types';

import styles from './TextArea.module.css';

type TextAreaProps = {
  type: CardType;
  text: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea = (props: TextAreaProps) => {
  const { type, onChange, text } = props;

  return (
    <div className={styles.container}>
      <textarea
        className={styles.textArea}
        contentEditable={type === CARD_TYPE.left}
        onChange={onChange}
        value={text}
      />
      {type === CARD_TYPE.left && (
        <span>
          {text.length}/{MAX_INPUT_LENGTH}
        </span>
      )}
    </div>
  );
};

export default TextArea;
