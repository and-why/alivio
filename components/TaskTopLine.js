import React, { useState } from 'react';
import Icon from '@chakra-ui/icon';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Tag } from '@chakra-ui/tag';
import { CheckIcon } from '@chakra-ui/icons';
import { format } from 'date-fns';
import { color } from '@chakra-ui/react';

export default function TaskTopLine({ task, handleOpenTaskDetails, open }) {
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
      // bg={open && 'gray.100'}
    >
      <Flex justifyContent='flex-start' align='center'>
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
      </Flex>

      <Flex justify='space-between' w='100%' align='center' onClick={handleOpenTaskDetails}>
        <Text fontSize='md' mr={10}>
          {open ? 'Complete: ' + taskName : taskName}
        </Text>

        <Flex justify='flex-end' justifySelf='flex-end' textAlign='right'>
          {dateDue && today.toLocaleDateString() > due.toLocaleDateString() && (
            <Tag colorScheme='whatsapp' mr={2} minHeight='1rem' fontSize='10px'>
              DUE IN {difference} DAY{difference < 1 && 'S'}
            </Tag>
          )}
          {dateDue && today.toLocaleDateString() < due.toLocaleDateString() && (
            <Tag colorScheme='red' mr={2} minHeight='1rem' fontSize='10px'>
              OVERDUE
            </Tag>
          )}
          {dateDue && today.toLocaleDateString() == due.toLocaleDateString() && (
            <Tag colorScheme='orange' mr={2} minHeight='1rem' fontSize='10px'>
              DUE TODAY
            </Tag>
          )}
          {dateDue && (
            <Tag colorScheme='whatsapp' mr={2} minHeight='1rem' fontSize='10px'>
              {format(new Date(dateDue), 'PPP')}
            </Tag>
          )}
          {/* {open && <Tag colorScheme='blue'>CLOSE</Tag>} */}
        </Flex>
      </Flex>
    </Flex>
  );
}
