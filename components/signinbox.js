import Image from 'next/image';
import { useAuth } from '../lib/auth';
import styles from '../styles/signinbox.module.css';

export default function Signinbox(props) {
  const auth = useAuth();
  return (
    <div className={styles.signin_box}>
      <h1 className={styles.signin_title}>Welcome to alivio</h1>
      <p className={styles.signin_tagline}>Giving your mind some relief</p>
      <p className={styles.signin_signin}>Signin with...</p>
      <div className={styles.signin_tiles}>
        <div className={styles.signin_tile} onClick={(e) => auth.signinWithGithub()}>
          <Image width={50} height={50} src='/images/Github_logo.svg' alt='Github Logo' />
          <span className={styles.signin_icon_text}>Github</span>
        </div>
        <div className={styles.signin_tile}>
          <Image width={50} height={50} src='/images/Twitter_logo.svg' alt='Twitter Logo' />
          <span className={styles.signin_icon_text}>Twitter</span>
        </div>
        <div className={styles.signin_tile}>
          <Image width={50} height={50} src='/images/Google_logo.svg' alt='Google Logo' />
          <span className={styles.signin_icon_text}>Google</span>
        </div>
      </div>
    </div>
  );
}
