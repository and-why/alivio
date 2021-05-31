import React, { useState } from 'react';
import Icon from '@chakra-ui/icon';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Tag } from '@chakra-ui/tag';
import { CheckIcon } from '@chakra-ui/icons';
import { format } from 'date-fns';
import { color } from '@chakra-ui/react';

export default function TaskTopLine({ task, handleOpenTaskDetails, taskIsOpen }) {
  const { dateDue, isCompleted, taskName } = task;
  const today = new Date();
  const due = new Date(dateDue);
  const difference = -Math.round((today.getTime() - due.getTime()) / (1000 * 3600 * 24));

  const [isComplete, setIsCompleted] = useState(isCompleted);

  const handleIsCompleted = () => {
    return setIsCompleted(!isComplete);
  };
  return (
    <Flex
      _hover={{ cursor: 'pointer' }}
      justify='space-between'
      w='100%'
      alignItems='center'
      opacity={isComplete && '40%'}
      onClick={handleOpenTaskDetails}
      bg={taskIsOpen && 'gray.200'}
    >
      <Flex justifyContent='flex-start' alignItems='center' mb={2}>
        {isComplete ? (
          <CheckIcon
            onClick={handleIsCompleted}
            mr={4}
            border='2px solid black'
            h={6}
            w={6}
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
            h={6}
            w={6}
            p={1}
            cursor='pointer'
          ></Box>
        )}
        <Text fontSize='md' mr={10}>
          {taskName}
        </Text>
      </Flex>
      {dateDue && today.toLocaleDateString() < due.toLocaleDateString() && (
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
      {dateDue && (
        <Tag colorScheme='whatsapp' mr={2} minHeight='1rem' fontSize='10px'>
          {format(new Date(dateDue), 'PPP')}
        </Tag>
      )}
    </Flex>
  );
}
