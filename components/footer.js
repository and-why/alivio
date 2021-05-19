import { Box, Flex } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Flex p='2' direction='flex-row' align='center' justify='center'>
      <Box pr='2'>
        <Image src='/images/Logo.svg' alt='Vercel Logo' width={77} height={29} />
      </Box>
      <Box>
        <span>relief for your brain </span>
      </Box>
    </Flex>
  );
}
