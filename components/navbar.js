import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Flex, Heading, Link, Text } from '@chakra-ui/layout';
import { useAuth } from '../lib/auth';

const Navbar = () => {
  const auth = useAuth();

  return (
    <Flex justifyContent='space-between' width='100%' alignItems='center'>
      <Flex>
        <Link mr={2}>To Do</Link>
        <Text>|</Text>
        <Link ml={2}>Notes</Link>
      </Flex>
      <Heading as='h2' size='md' fontWeight='normal'>
        alivio
      </Heading>
      <Flex align='center' justify='center'>
        <Link onClick={(e) => auth.signout()} mr={4}>
          Sign Out
        </Link>
        <Avatar src={auth.user.photoUrl} w={10} h={10} />
      </Flex>
    </Flex>
  );
};

export default Navbar;
