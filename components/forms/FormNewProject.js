import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';

import { Input } from '@chakra-ui/input';
import { Button, Flex, useToast } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { createNewProject } from '@/lib/db';
import { randomHash } from '@/utils/random-hash';

export default function FormNewProject(props) {
  const { user } = useAuth();
  const uid = user.uid;
  const toast = useToast();

  const { register, handleSubmit, reset, setFocus } = useForm();
  const createProject = (data) => {
    const hash = randomHash(20);
    const newProject = {
      projectId: hash,
      uid,
      projectName: data.projectName,
      dateCreated: new Date().toISOString(),
    };
    createNewProject(newProject);
    toast({
      title: 'New Project Added.',
      description: 'Open the Project to add more detail',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    mutate(
      ['/api/projects', user.token],
      async (data) => {
        return { projects: [...data.projects, newProject] };
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
    setFocus('projectName');
  }, [setFocus]);

  return (
    <form onSubmit={handleSubmit(createProject)}>
      <Input mb={2} {...register('projectName')} placeholder='Project Name' />
      <Flex>
        <Button onClick={handleClose} w='45%' mr={2}>
          Cancel
        </Button>
        <Button type='submit' w='55%' colorScheme='green'>
          Add
        </Button>
      </Flex>
    </form>
  );
}
