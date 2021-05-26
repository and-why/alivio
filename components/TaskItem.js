import React, { useState } from 'react';
import Icon from '@chakra-ui/icon';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Tag } from '@chakra-ui/tag';
import { CheckIcon } from '@chakra-ui/icons';
import { format } from 'date-fns';
import { color } from '@chakra-ui/react';
import TaskTopLine from './TaskTopLine';
import TaskInsideDetails from './TaskInsideDetails';

export default function TaskItem({ task }) {
  const [taskIsOpen, setTaskIsOpen] = useState(false);

  const handleOpenTaskDetails = () => {
    setTaskIsOpen(!taskIsOpen);
  };
  return (
    <>
      <TaskTopLine task={task} handleOpenTaskDetails={handleOpenTaskDetails} open={taskIsOpen} />
      {taskIsOpen && <TaskInsideDetails task={task} />}
    </>
  );
}
