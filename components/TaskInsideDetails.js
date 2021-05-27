import { CalendarIcon, SpinnerIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

import EditTaskForm from './forms/FormEditTask';

export default function TaskInsideDetails({ task }) {
  const data = task;

  return (
    <Flex backgroundColor='gray.100' p={6} mb={4} borderBottomRadius='10px'>
      {data ? <EditTaskForm preloadedValues={data} /> : <SpinnerIcon />}
    </Flex>
  );
}
