import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import Signintile from './signintile';

export default function Signinbox(props) {
  return (
    <Box p='10' boxShadow='md' rounded='md'>
      <Heading align='center'>Welcome to alivio</Heading>
      <Text align='center' fontSize='12'>
        Giving your mind some relief
      </Text>
      <Text align='center' p='4'>
        Signin with...
      </Text>
      <Box p={4}>
        <Flex>
          <Signintile name={'Github'} />
          <Signintile name={'Twitter'} />
          <Signintile name={'Google'} />
        </Flex>
      </Box>
    </Box>
  );
}
