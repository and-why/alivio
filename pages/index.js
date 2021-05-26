import Head from 'next/head';
import { Button } from '@chakra-ui/button';
import { Flex, Link } from '@chakra-ui/layout';
import NextLink from 'next/link';
import { useAuth } from '@/lib/auth';
import Footer from '@/components/Footer';
import Signinbox from '@/components/Signinbox';

export default function Home() {
  const auth = useAuth();

  return (
    <Flex direction='column' height='100vh' bg='gray.200'>
      <Head>
        <title>alivio</title>
        <meta name='description' content='Giving your mind some relief' />
        <link rel='icon' href='/favicon.ico' />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('alivio-auth')) {
            window.location.href = "/dashboard"
          }
        `,
          }}
        />
      </Head>

      <Flex padding='5' align='center' justify='center' height='100%'>
        {auth.user ? (
          <Button
            bg='#2d333b'
            color='white'
            _hover={{ background: '#1e2228' }}
            _active={{ background: '#1e2228' }}
          >
            <NextLink as='/dashboard' href='/dashboard' passHref>
              <Link _hover={{ textDecoration: 'none' }}>Go to Dashboard</Link>
            </NextLink>
          </Button>
        ) : (
          <Signinbox />
        )}
      </Flex>
      <Footer />
    </Flex>
  );
}
