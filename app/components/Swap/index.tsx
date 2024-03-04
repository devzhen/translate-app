import Image from 'next/image';

import styles from './Swap.module.css';

type SwapProps = {
  onClick: () => void;
  disabled: boolean;
};

function Swap(props: SwapProps) {
  const { onClick, disabled } = props;

  return (
    <button className={styles.container} onClick={onClick} disabled={disabled}>
      <Image
        src="/horizontal_top_left_main.svg"
        width={20}
        height={20}
        alt="Img"
        draggable={false}
      />
    </button>
  );
}

export default Swap;
