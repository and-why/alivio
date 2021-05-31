import { useAuth } from '@/lib/auth';
import { editTask } from '@/lib/db';
import { Button, Flex, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';

import ReactDatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { mutate } from 'swr';

const EditTaskForm = ({ preloadedValues }) => {
  const { user } = useAuth();
  const toast = useToast();

  const { register, handleSubmit, setValue, reset, setFocus, control } = useForm({
    defaultValues: preloadedValues,
  });
  const handleEditTask = (formData) => {
    const dateDue = !formData.dateDue ? null : new Date(formData.dateDue).toISOString();
    const newTaskDetail = {
      ...preloadedValues,
      dateDue: dateDue,
      notes: formData.notes,
    };
    editTask(newTaskDetail);
    toast({
      title: 'Task Edited.',
      description: 'Open the Task to add a list of items',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    mutate(
      ['/api/tasks', user.token],
      async (data) => {
        console.log('newTaskDetail', newTaskDetail);
        const newData = data.tasks.map(
          (task) => [newTaskDetail].find((o) => o.id === task.id) || task,
        );
        return { tasks: [...newData] };
      },
      false,
    );
  };
  return (
    <FormControl as='form' onSubmit={handleSubmit(handleEditTask)}>
      <Flex
        display='flex'
        flexDirection='column'
        justify='flex-start'
        align='flex-start'
        w='full'
        mb={4}
      >
        <FormLabel fontSize='10px' m={0}>
          Due Date
        </FormLabel>
        <Controller
          _hover={{ cursor: 'pointer' }}
          control={control}
          name='dateDue'
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <ReactDatePicker
              onChange={onChange}
              variant='unstyled'
              // inputRef={ref}
              onBlur={onBlur}
              selected={!value ? value : new Date(value)}
              dateFormat='dd MMM yyyy'
              shouldCloseOnSelect
              placeholderText={'Select a date'}
              showTimeSelect={false}
              todayButton='Today'
              isClearable
            />
          )}
        />
      </Flex>
      <Flex
        display='flex'
        flexDirection='column'
        justify='flex-start'
        align='flex-start'
        w='full'
        mb={4}
      >
        <FormLabel fontSize='10px' m={0}>
          Notes
        </FormLabel>
        <Input
          variant='unstyled'
          placeholder='This is a note...'
          name='notes'
          {...register('notes')}
        />
      </Flex>
      <Flex mt={4}>
        <Button w='55%' type='submit' colorScheme='green'>
          Update
        </Button>
      </Flex>
    </FormControl>
  );
};

export default EditTaskForm;
