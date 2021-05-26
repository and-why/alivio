import { CalendarIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
} from '@chakra-ui/react';
import ReactDatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';

export default function TaskInsideDetails({ task }) {
  const { register, handleSubmit, reset, setFocus, control } = useForm();
  const editTask = (formData) => {
    const hash = randomHash(20);
    const dateDue = !formData.dateDue ? null : new Date(formData.dateDue).toISOString();
    const newTaskDetail = {
      taskId: hash,
      uid,
      dateCreated: new Date().toISOString(),
      projectId,
      dateDue: dateDue,
      taskName: formData.taskName,
      isCompleted: false,
    };
  };
  return (
    <Flex backgroundColor='gray.200' p={6} mb={4} borderBottomRadius='10px'>
      <FormControl>
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
            render={({ field: { onChange, onBlur, date, ref } }) => (
              <ReactDatePicker
                onChange={onChange}
                variant='unstyled'
                onBlur={onBlur}
                selected={date}
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
          <Input variant='unstyled' placeholder='Notes' />
        </Flex>
      </FormControl>
    </Flex>
  );
}
