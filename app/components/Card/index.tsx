import { CardType } from '@/app/types';

import styles from './Card.module.css';

type CardProps = {
  type: CardType;
};

function Card(props: CardProps) {
  const { type } = props;

  return <div className={styles.container} data-type={type}></div>;
}

export default Card;
