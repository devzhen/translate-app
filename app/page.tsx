import { headers } from 'next/headers';
import Image from 'next/image';

import bg from '../public/hero_img.jpg';

import ApiError from './components/ApiError';
import CardWrapper from './components/CardWrapper';
import Footer from './components/Footer';
import Header from './components/Header';
import styles from './page.module.css';

export default async function Home() {
  const requestUrl = headers().get('x-url');
  // eslint-disable-next-line no-console
  console.log('URL -', requestUrl);

  // Fetch available languages
  const url = new URL(`${requestUrl}api/translation/availableLangs`);
  const response = await fetch(url.toString());
  const langs = await response.json();

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
        {langs.error && <ApiError error={langs.error} status={langs.status} />}
        {!langs.error && <CardWrapper requestUrl={requestUrl as string} langs={langs} />}
      </div>
      <Footer />
    </main>
  );
}
