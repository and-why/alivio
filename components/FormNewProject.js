import React, { useEffect } from 'react';
import { Input } from '@chakra-ui/input';
import { useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/lib/auth';
import { createNewProject } from '@/lib/db';

export default function FormNewProject(props) {
  console.log(props);
  const auth = useAuth();
  const uid = auth.user.uid;
  const now = new Date().getTime();
  const toast = useToast();

  const { register, handleSubmit, reset, setFocus } = useForm();
  const createProject = (data) => {
    createNewProject(uid, data, now);
    toast({
      title: 'New Project Added.',
      description: 'Open the Project to add more detail',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    props.handleOpenState();

    reset();
  };
  useEffect(() => {
    setFocus('projectName');
  }, [setFocus]);

  return (
    <form onSubmit={handleSubmit(createProject)}>
      <Input mt={10} {...register('projectName')} placeholder='Project Name' />
    </form>
  );
}
