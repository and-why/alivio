import { useState } from 'react';
import NextLink from 'next/link';
import { Box, Heading, Link } from '@chakra-ui/layout';

import FormNewTask from '@/components/forms/FormNewTask';

export default function TaskItemList({ tasks, projectId }) {
  const [formOpen, setFormOpen] = useState(false);
  function handleInput() {
    setFormOpen(true);
  }
  function handleOpenState() {
    setFormOpen(false);
  }
  const escFunction = (e) => {
    if (e.keyCode === 27) {
      setFormOpen(false);
    }
  };
  return (
    <Box>
      {tasks.map((task) => {
        if (task.projectId === projectId) {
          return (
            <NextLink
              key={task.taskId}
              mb={4}
              href='/projects/tasks/[sideId]'
              as={`/projects/tasks/${task.taskId}`}
            >
              <Link>{task.taskName}</Link>
            </NextLink>
          );
        }
      })}
      {formOpen ? (
        <FormNewTask projectId={projectId} handleOpenState={handleOpenState} />
      ) : (
        <Link size='md' mt={10} justifyContent='flex-start' onClick={handleInput}>
          Create New Task...
        </Link>
      )}
    </Box>
  );
}
