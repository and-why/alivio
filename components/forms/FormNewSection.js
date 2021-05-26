import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import { mutate } from 'swr';

import { Input } from '@chakra-ui/input';
import { Button, Flex, useToast } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { createNewSection } from '@/lib/db';
import { randomHash } from '@/utils/random-hash';

import 'react-datepicker/dist/react-datepicker.css';

export default function FormNewSection(props) {
  const { user } = useAuth();
  const uid = user.uid;
  const projectId = props.projectId;
  const toast = useToast();

  const { register, handleSubmit, reset, setFocus, control } = useForm();
  const createTask = (formData) => {
    const hash = randomHash(20);
    const newSection = {
      sectionId: hash,
      uid,
      projectId,
      sectionName: formData.taskName,
      class: 'section',
    };
    createNewSection(newSection);
    toast({
      title: 'New Section Added.',
      description: 'New Section Created',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    mutate(
      ['/api/tasks', user.token],
      async (data) => {
        return { section: [...data.tasks, newTask] };
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
    setFocus('sectionName');
  }, [setFocus]);

  return (
    <form onSubmit={handleSubmit(createTask)}>
      <Input mt={8} mb={2} {...register('sectionName')} placeholder='Section Name' />
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
