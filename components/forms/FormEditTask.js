import { Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';

import ReactDatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';

export default function EditTaskForm({ preloadedValues }) {
  const { register, handleSubmit, reset, setFocus, control } = useForm({
    defaultValues: preloadedValues,
  });
  const handleEditTask = (formData) => {
    const hash = randomHash(20);
    const dateDue = !formData.dateDue ? null : new Date(formData.dateDue).toISOString();
    const newTaskDetail = {
      taskId: hash,
      uid,
      dateCreated: new Date().toISOString(),
      projectId,
      dateDue: dateDue,
      notes: 'fake notes',
      taskName: formData.taskName,
      isCompleted: false,
    };
  };
  return (
    <FormControl onSubmit={handleEditTask}>
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
          {...register('dateDue')}
          _hover={{ cursor: 'pointer' }}
          control={control}
          name='dateDue'
          render={({ field: { onChange, onBlur, value } }) => (
            <ReactDatePicker
              onChange={onChange}
              variant='unstyled'
              onBlur={onBlur}
              selected={!value ? value : new Date(value)}
              dateFormat='dd MMM yyyy'
              shouldCloseOnSelect
              calendarIcon='calendar'
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
    </FormControl>
  );
}
