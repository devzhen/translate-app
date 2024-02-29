import Image from 'next/image';

import bg from '../public/hero_img.jpg';

import CardWrapper from './components/CardWrapper';
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
        <CardWrapper></CardWrapper>
      </div>
      {/*
        <Image src="/expand_down.svg" width={16} height={16} alt="Img" draggable={false} />
      */}
      <Footer />
    </main>
  );
}
