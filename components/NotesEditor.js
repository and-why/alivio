import { Button, Flex, Heading, Textarea } from '@chakra-ui/react';

export default function NotesEditor() {
  return (
    <Flex direction='column' maxWidth='700px' w='100%'>
      <Heading as='h3' mb={4} size='md'>
        Notes
      </Heading>
      <Textarea placeholder='Enter your notes here...' />
    </Flex>
  );
}
