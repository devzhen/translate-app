import Image from 'next/image';

import styles from './TranslateButton.module.css';

type TranslateButtonProps = {
  translate: () => void;
  disabled: boolean;
  isLoading?: boolean;
};

function TranslateButton(props: TranslateButtonProps) {
  const { translate, disabled, isLoading } = props;

  const clickHandler = () => {
    if (disabled || isLoading) {
      return;
    }

    translate();
  };

  return (
    <button className={styles.container} onClick={clickHandler} disabled={disabled}>
      {!isLoading && (
        <>
          <Image src="/sort_alfa.svg" width={24} height={24} alt="Img" draggable={false} />
          <span>Translate</span>
        </>
      )}
      {isLoading && <div className={styles.loader} />}
    </button>
  );
}

export default TranslateButton;
