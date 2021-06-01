import { CalendarIcon, SpinnerIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

import EditTaskForm from './forms/FormEditTask';

export default function TaskInsideDetails({ task }) {
  const data = task;

  return <Flex p={6}>{data ? <EditTaskForm preloadedValues={data} /> : <SpinnerIcon />}</Flex>;
}
