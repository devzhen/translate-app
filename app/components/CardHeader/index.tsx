import { CARD_TYPE } from '@/app/constants';
import { BadgesType, CardType } from '@/app/types';

import Badge from '../Badge';
import Swap from '../Swap';

import styles from './CardHeader.module.css';

type HeaderProps = {
  type: CardType;
  badges: BadgesType;
  onSwap: () => void;
};

function Card(props: HeaderProps) {
  const { type, badges, onSwap } = props;

  return (
    <div className={styles.container} data-card-header-type={type}>
      {type === CARD_TYPE.left && <Badge text="Detect Language" />}
      {badges.map((item) => {
        return <Badge key={item.text} text={item.text} isActive={item.isActive} />;
      })}
      {type === CARD_TYPE.right && <Swap onClick={onSwap} />}
    </div>
  );
}

export default Card;
