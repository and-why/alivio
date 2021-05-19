import { Box, Flex, Heading, Link } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import DashboardShell from '../components/DashboardShell';
import { useAuth } from '../lib/auth';

export default function DashboardPage() {
  const auth = useAuth();
  if (!auth.user) {
    return (
      <Flex h='100vh' w='100vw' justify='center' align='center'>
        <Spinner size='xl' speed='0.65s' thickness='5px' />
      </Flex>
    );
  }
  return <DashboardShell />;
}
