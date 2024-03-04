import Image from 'next/image';

import { CARD_TYPE } from '@/app/constants';
import { CardType } from '@/app/types';

import TranslateButton from '../TranslateButton';

import styles from './CardFooter.module.css';

type HeaderProps = {
  copyText: () => void;
  getSound: () => void;
  translate: () => void;
  type: CardType;
  disabled: boolean;
  isLoading?: boolean;
};

function CardFooter(props: HeaderProps) {
  const { getSound, copyText, type, translate, disabled, isLoading } = props;

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={getSound}>
        <Image src="/sound_max_fill.svg" width={20} height={20} alt="Img" draggable={false} />
      </button>
      <button className={`${styles.button} ${styles.buttonCopy}`} onClick={copyText}>
        <Image src="/copy.svg" width={20} height={20} alt="Img" draggable={false} />
      </button>
      {type === CARD_TYPE.left && (
        <TranslateButton translate={translate} disabled={disabled} isLoading={isLoading} />
      )}
    </div>
  );
}

export default CardFooter;
