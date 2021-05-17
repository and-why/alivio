import Image from 'next/image';

export default function Signintile(props) {
  <div className={styles.signin_tile} onClick={(e) => auth.signinWithGithub()}>
    <Image width={50} height={50} src='/images/Github_logo.svg' alt='Github Logo' />
    <span className={styles.signin_icon_text}>Github</span>
  </div>;
}
