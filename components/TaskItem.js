import React, { useState } from 'react';
import Icon from '@chakra-ui/icon';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Tag } from '@chakra-ui/tag';
import { CheckIcon } from '@chakra-ui/icons';

export default function TaskItem({ name, dueDate }) {
  const today = new Date();
  const due = new Date(dueDate);
  const difference = -Math.round((today.getTime() - due.getTime()) / (1000 * 3600 * 24));

  const [isCompleted, setIsCompleted] = useState(false);

  const handleIsCompleted = () => {
    return setIsCompleted(!isCompleted);
  };
  return (
    <Flex justifyContent='flex-start' alignItems='center' mb={2}>
      {isCompleted ? (
        <CheckIcon
          onClick={handleIsCompleted}
          mr={4}
          border='2px solid black'
          h={8}
          w={8}
          p={1}
          borderRadius='50%'
          cursor='pointer'
        />
      ) : (
        <Box
          onClick={handleIsCompleted}
          borderRadius='50%'
          mr={4}
          border='2px solid black'
          h={8}
          w={8}
          p={1}
          cursor='pointer'
        ></Box>
      )}
      <Text fontSize='md' mr={10}>
        {name}
      </Text>
      {dueDate && today.toLocaleDateString() < due.toLocaleDateString() && (
        <Tag colorScheme='whatsapp' mr={2} minHeight='1rem' fontSize='10px'>
          DUE IN {difference} DAY{difference > 1 && 'S'}
        </Tag>
      )}
      {today.toLocaleDateString() > due.toLocaleDateString() && (
        <Tag colorScheme='red' mr={2} minHeight='1rem' fontSize='10px'>
          OVERDUE
        </Tag>
      )}
      {today.toLocaleDateString() == due.toLocaleDateString() && (
        <Tag colorScheme='orange' mr={2} minHeight='1rem' fontSize='10px'>
          DUE TODAY
        </Tag>
      )}
      {dueDate && (
        <Tag colorScheme='whatsapp' mr={2} minHeight='1rem' fontSize='10px'>
          {dueDate}
        </Tag>
      )}
    </Flex>
  );
}
