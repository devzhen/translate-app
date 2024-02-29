import Image from 'next/image';

import styles from './Swap.module.css';

type SwapProps = {
  onClick: () => void;
};

function Swap(props: SwapProps) {
  const { onClick } = props;

  return (
    <button className={styles.container} onClick={onClick}>
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
