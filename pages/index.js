import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { auth, useAuth } from '../lib/auth';

import Footer from '../components/footer';

export default function Home() {
  const auth = useAuth();

  return (
    <div className={styles.container}>
      <Head>
        <title>alivio</title>
        <meta name='description' content='Giving your mind some relief' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        {auth?.user ? (
          <div>
            <button onClick={(e) => auth.signout()}>Sign out </button>
          </div>
        ) : (
          <div className={styles.signin_box}>
            <h1 className={styles.signin_title}>Welcome to alivio</h1>
            <p className={styles.signin_tagline}>Giving your mind some relief</p>
            <p className={styles.signin_signin}>Signin with...</p>
            <div className={styles.signin_tiles}>
              <div className={styles.signin_tile} onClick={(e) => auth.signinWithGithub()}>
                <Image width={50} height={50} src='/images/Github_logo.svg' alt='Github Logo' />
                <span className={styles.signin_icon_text}>Github</span>
              </div>
              <div className={styles.signin_tile} onClick={(e) => auth.signinWithTwitter()}>
                <Image width={50} height={50} src='/images/Twitter_logo.svg' alt='Twitter Logo' />
                <span className={styles.signin_icon_text}>Twitter</span>
              </div>
              <div className={styles.signin_tile} onClick={(e) => auth.signinWithGoogle()}>
                <Image width={50} height={50} src='/images/Google_logo.svg' alt='Google Logo' />
                <span className={styles.signin_icon_text}>Google</span>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
