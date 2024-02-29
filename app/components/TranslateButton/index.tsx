import Image from 'next/image';

import styles from './TranslateButton.module.css';

type TranslateButtonProps = {
  translate: () => void;
  disabled: boolean;
};

function TranslateButton(props: TranslateButtonProps) {
  const { translate, disabled } = props;

  return (
    <button className={styles.container} onClick={translate} disabled={disabled}>
      <Image src="/sort_alfa.svg" width={24} height={24} alt="Img" draggable={false} />
      <span>Translate</span>
    </button>
  );
}

export default TranslateButton;
