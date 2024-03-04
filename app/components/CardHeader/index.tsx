import { CARD_TYPE } from '@/app/constants';
import { CardType } from '@/app/types';

import Badge from '../Badge';
import Swap from '../Swap';

import styles from './CardHeader.module.css';

type HeaderProps = {
  type: CardType;
  badges: {
    text: string[];
    active: boolean[];
    source: string[];
  };
  onSwap: () => void;
  onBadgeClick: (source: string) => void;
  isSwapDisabled?: boolean;
};

function Card(props: HeaderProps) {
  const { type, badges, onSwap, onBadgeClick, isSwapDisabled = false } = props;

  const onClick = (source: string) => () => {
    onBadgeClick(source);
  };

  return (
    <div className={styles.container} data-card-header-type={type}>
      {badges.text.map((item, index) => {
        return (
          <Badge
            key={item}
            text={item}
            isActive={badges.active[index] === true}
            onClick={onClick(badges.source[index])}
          />
        );
      })}
      {type === CARD_TYPE.right && <Swap onClick={onSwap} disabled={isSwapDisabled} />}
    </div>
  );
}

export default Card;
