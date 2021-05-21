import React, { useEffect } from 'react';
import { Input } from '@chakra-ui/input';
import { Button, Flex, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/lib/auth';
import { createNewTask } from '@/lib/db';
import { randomHash } from '@/utils/random-hash';
import { mutate } from 'swr';

export default function FormNewTask(props) {
  const auth = useAuth();
  const uid = auth.user.uid;
  const projectId = props.projectId;
  const toast = useToast();

  const { register, handleSubmit, reset, setFocus } = useForm();
  const createTask = (data) => {
    const hash = randomHash(20);
    console.log(data);
    const newTask = {
      taskId: hash,
      uid,
      dateCreated: new Date().getTime(),
      projectId,
      taskName: data.taskName,
    };
    createNewTask(newTask);
    toast({
      title: 'New Task Added.',
      description: 'Open the Tasj to add a list of items',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    mutate(
      `/api/tasks/${uid}`,
      async (data) => {
        return { tasks: [...data.tasks, newTask] };
      },
      false,
    );
    props.handleOpenState();
    reset();
  };

  const handleClose = (e) => {
    e.preventDefault();
    props.handleOpenState();
  };
  useEffect(() => {
    setFocus('taskName');
  }, [setFocus]);

  return (
    <form onSubmit={handleSubmit(createTask)}>
      <Input mb={2} {...register('taskName')} placeholder='Task Name' />
      <Flex>
        <Button onClick={handleClose} w='45%' mr={2}>
          Cancel
        </Button>
        <Button w='55%' type='submit' colorScheme='green'>
          Add
        </Button>
      </Flex>
    </form>
  );
}
