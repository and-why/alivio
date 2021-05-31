import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Flex, Heading, Link, Text } from '@chakra-ui/layout';
import { useAuth } from '@/lib/auth';
import { Input } from '@chakra-ui/react';
import NextLink from 'next/link';

const Navbar = () => {
  const auth = useAuth();

  return (
    <Flex
      justifyContent='space-between'
      width='100%'
      alignItems='center'
      borderBottom='1px solid'
      pb={4}
      borderBottomColor='gray.100'
    >
      <Flex>
        <Input placeholder='Search' />
      </Flex>
      <Heading as='h2' size='md' fontWeight='normal'>
        alivio
      </Heading>
      <Flex align='center' justify='center'>
        <Link onClick={(e) => auth.signout()} mr={4}>
          Sign Out
        </Link>
        <NextLink href='/account' as={`/account`} passHref>
          <Link mr={4}>
            <Avatar size='sm' src={auth.user?.photoUrl} />
          </Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};

export default Navbar;
