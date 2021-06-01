import DashboardShell from '@/components/DashboardShell';
import { useAuth } from '@/lib/auth';
import { createCheckoutSession, goToBillingPortal } from '@/lib/db';
import {
  Flex,
  Heading,
  Button,
  Text,
  Tag,
  Box,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function AccountPage() {
  const { user } = useAuth();
  const [isUpgradeLoading, setIsUpgradeLoading] = useState(false);
  const [isBillingLoading, setIsBillingLoading] = useState(false);
  console.log(user);
  return (
    <DashboardShell>
      <Flex direction='column' w='100%' px={4}>
        <Heading size='md' mb={8}>
          My Account
        </Heading>
        <Flex w='100%' borderBottom='1px solid' borderColor='gray.100'>
          <Heading w='100%' as='h2' size='sm' pb={4}>
            Add More Information
          </Heading>
        </Flex>
        <Flex py={6} mb={4}>
          <Box w='35%' minWidth='200px' maxWidth='300px' pr={4}>
            <Text>
              Here you can opt to add more information about yourself. Who knows, it might help us
              reward you better.
            </Text>
          </Box>
        </Flex>

        <Flex w='100%' borderBottom='1px solid' borderColor='gray.100'>
          <Heading w='100%' as='h2' size='sm' pb={4}>
            Subscription Information
          </Heading>
        </Flex>
        <Flex py={6}>
          <Box w='35%' minWidth='200px' maxWidth='300px' pr={4}>
            <Text>
              Here you can upgrade, downgrade, cancel, change your card or simply check your billing
              information.
            </Text>
          </Box>
          <Flex direction='column' w='65%' maxWidth='600px' px={8}>
            <Flex justify='space-between' mb={4}>
              <Text>Your Plan</Text>
              <Tag colorScheme='orange'>{user?.stripeRole}</Tag>
            </Flex>
            <Heading as='h4' size='sm' mb={2}>
              About your plan
            </Heading>
            <Flex justify='space-between' mb={4} w='100%'>
              <FeedbackUsage type={user?.stripeRole} />
            </Flex>
            <Flex justify='flex-start'>
              <Button
                isLoading={isUpgradeLoading}
                mr={2}
                w='150px'
                colorScheme='whatsapp'
                onClick={(e) => {
                  setIsUpgradeLoading(true);
                  createCheckoutSession(user?.uid);
                }}
              >
                Upgrade
              </Button>
              <Button
                isLoading={isBillingLoading}
                colorScheme='linkedin'
                w='150px'
                onClick={(e) => {
                  setIsBillingLoading(true);
                  goToBillingPortal();
                }}
              >
                Billing
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </DashboardShell>
  );
}

const FeedbackUsage = ({ type }) => {
  let workspaceNumber = 1;
  let workspaceText = '1';
  let fileLimitText = '10mb';
  let fileLimit = 10;
  if (type === 'starter') {
    workspaceNumber = 5;
    workspaceText = '5';
    fileLimitText = '100mb';
    fileLimit = 100;
  }
  if (type == 'premium') {
    workspaceNumber = '∞';
    workspaceText = 'Unlimited';
    fileLimitText = '10gb';
    fileLimit = 10;
  }
  return (
    <StatGroup w='100%'>
      <Stat>
        <StatLabel color='gray.700'>Workspaces</StatLabel>
        <StatNumber fontWeight='medium'>1/{workspaceNumber}</StatNumber>
        <StatHelpText>
          {workspaceText} workspace{workspaceNumber == 1 ? '' : 's'}
        </StatHelpText>
      </Stat>

      <Stat>
        <StatLabel color='gray.700'>Files</StatLabel>
        <StatNumber fontWeight='medium'>1/{fileLimitText}</StatNumber>
        <StatHelpText>Up to {fileLimitText} of files</StatHelpText>
      </Stat>
    </StatGroup>
  );
};
