import Image from 'next/image';

import styles from './Header.module.css';

function Header() {
  return (
    <div className={styles.container}>
      <Image src="/logo.svg" width={137} height={45} alt="Img" draggable={false} />
    </div>
  );
}

export default Header;
