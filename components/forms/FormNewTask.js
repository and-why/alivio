import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';

import { Input } from '@chakra-ui/input';
import { Button, Flex, useToast } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import { createNewTask } from '@/lib/db';
import { randomHash } from '@/utils/random-hash';
import { mutate } from 'swr';

export default function FormNewTask(props) {
  const auth = useAuth();
  const uid = auth.user.uid;
  const projectId = props.projectId;
  const toast = useToast();

  const { register, handleSubmit, reset, setFocus, control } = useForm();
  const createTask = (data) => {
    const hash = randomHash(20);
    const newTask = {
      taskId: hash,
      uid,
      dateCreated: new Date().toISOString(),
      projectId,
      // dateDue: new Date(data.dateDue).toISOString(),
      taskName: data.taskName,
      isCompleted: false,
    };
    createNewTask(newTask);
    toast({
      title: 'New Task Added.',
      description: 'Open the Task to add a list of items',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    mutate(
      `/api/tasks`,
      async (data) => {
        console.log(data);
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
      <Controller
        control={control}
        name='dateDue'
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <ReactDatePicker onChange={onChange} onBlur={onBlur} selected={value} dateFormat='Pp' />
        )}
      />
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
