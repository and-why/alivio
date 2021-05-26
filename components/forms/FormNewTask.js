import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import { mutate } from 'swr';

import { Input } from '@chakra-ui/input';
import { Button, Flex, useToast } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { createNewTask } from '@/lib/db';
import { randomHash } from '@/utils/random-hash';
import fetcher from '@/utils/fetcher';

import 'react-datepicker/dist/react-datepicker.css';

export default function FormNewTask(props) {
  const { user } = useAuth();
  const uid = user.uid;
  const projectId = props.projectId;
  const toast = useToast();

  const { register, handleSubmit, reset, setFocus, control } = useForm();
  const createTask = (formData) => {
    const hash = randomHash(20);
    const dateDue = !formData.dateDue ? null : new Date(formData.dateDue).toISOString();
    const newTask = {
      taskId: hash,
      uid,
      dateCreated: new Date().toISOString(),
      projectId,
      dateDue: dateDue,
      taskName: formData.taskName,
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
      ['/api/tasks', user.token],
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
      <Input mt={8} mb={2} {...register('taskName')} placeholder='Task Name' />
      <Controller
        control={control}
        name='dateDue'
        dateFormat='P'
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
