import Image from 'next/image';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.logo_footer}>
        <Image src='/images/Logo.svg' alt='Vercel Logo' width={77} height={29} />
      </span>
      <span>relief for your brain </span>
    </footer>
  );
}
