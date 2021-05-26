import { useAuth } from '@/lib/auth';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { GithubIcon, GoogleIcon, TwitterIcon } from './icons/Icons';

export default function Signinbox(props) {
  const auth = useAuth();
  return (
    <Box p='10' boxShadow='md' rounded='md' bg='white'>
      <Heading align='center'>Welcome to alivio</Heading>
      <Text align='center' fontSize='12'>
        Giving your mind some relief
      </Text>
      <Text align='center' p='4'>
        Signin with...
      </Text>
      <Box p={4}>
        <Flex>
          <Button
            px='4'
            mx='4'
            bg='#2d333b'
            color='white'
            leftIcon={<GithubIcon fontSize='20px' />}
            onClick={(e) => {
              auth.signinWithGithub();
            }}
            _hover={{ background: '#1e2228' }}
          >
            Github
          </Button>
          <Button
            px='4'
            mx='4'
            colorScheme='twitter'
            leftIcon={<TwitterIcon fontSize='20px' />}
            onClick={(e) => {
              auth.signinWithTwitter();
            }}
          >
            Twitter
          </Button>
          <Button
            px='4'
            mx='4'
            colorScheme='red'
            leftIcon={<GoogleIcon fontSize='20px' />}
            onClick={(e) => {
              auth.signinWithGoogle();
            }}
          >
            Google
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
