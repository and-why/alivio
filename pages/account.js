import DashboardShell from '@/components/DashboardShell';
import { useAuth } from '@/lib/auth';
import { createCheckoutSession } from '@/lib/db';
import { Flex, Heading, Button } from '@chakra-ui/react';

export default function AccountPage() {
  const { user } = useAuth();
  return (
    <DashboardShell>
      <Flex direction='column'>
        <Heading size='md' mb={4}>
          My Account
        </Heading>
        <Button
          onClick={(e) => {
            createCheckoutSession(user.uid);
          }}
        >
          Upgrade
        </Button>
      </Flex>
    </DashboardShell>
  );
}
