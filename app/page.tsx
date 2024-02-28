import Image from 'next/image';

import bg from '../public/hero_img.jpg';

import Footer from './components/Footer';
import Header from './components/Header';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Image
        alt="Img"
        src={bg}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
        }}
      />
      <div className={styles.contentWrapper}>
        <Header />
      </div>
      {/* <div className={styles.contentWrapper}>
        <div className={styles.cardWrapper}>
          <Card />
          <Card />
        </div>
        <Image src="/copy.svg" width={20} height={20} alt="Img" draggable={false} />
        <Image src="/expand_down.svg" width={16} height={16} alt="Img" draggable={false} />
        <Image
          src="/horizontal_top_left_main.svg"
          width={20}
          height={20}
          alt="Img"
          draggable={false}
        />
        <Image src="/sort_alfa.svg" width={24} height={24} alt="Img" draggable={false} />
        <Image src="/sound_max_fill.svg" width={20} height={20} alt="Img" draggable={false} />
      </div> */}
      <Footer />
    </main>
  );
}
