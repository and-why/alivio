import React, { useEffect } from 'react';
import { Input } from '@chakra-ui/input';
import { useForm } from 'react-hook-form';
import { useAuth } from '../lib/auth';
import { createNewProject } from '../lib/db';

export default function FormNewProject(props) {
  console.log(props);
  const auth = useAuth();
  const uid = auth.user.uid;
  const now = new Date().getTime();

  const { register, handleSubmit, reset, setFocus } = useForm();
  const createProject = (data) => {
    createNewProject(uid, data, now);
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
