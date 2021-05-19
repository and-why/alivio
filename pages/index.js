import Head from 'next/head';
import { Button } from '@chakra-ui/button';
import { Flex, Link } from '@chakra-ui/layout';

import { useAuth } from '../lib/auth';
import Footer from '../components/footer';
import Signinbox from '../components/signinbox';

export default function Home() {
  const auth = useAuth();

  return (
    <Flex direction='column' height='100vh'>
      <Head>
        <title>alivio</title>
        <meta name='description' content='Giving your mind some relief' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Flex padding='5' align='center' justify='center'>
        {auth.user ? <Link href='/dashboard'>Go to Dashboard</Link> : <Signinbox />}
      </Flex>
      <Footer />
    </Flex>
  );
}
