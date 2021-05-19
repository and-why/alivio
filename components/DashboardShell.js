import React from 'react';
import {
  Flex,
  Heading,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import Navbar from './navbar';
import TaskItem from './TaskItem';
import Sidebar from './Sidebar';

const DashboardShell = () => {
  return (
    <Flex
      flexDirection='column'
      justifyContent='space-between'
      alignItems='center'
      height='100vh'
      minWidth='1000px'
      p={2}
    >
      <Navbar />
      <Flex justifyContent='center' alignItems='center' height='100%' width='100%'>
        <Sidebar />
        <Flex width='100%' height='100%' p={4}>
          <Flex width='100%' flexDirection='column'>
            <Breadcrumb spacing={2} mb={2}>
              <BreadcrumbItem mr={2} isCurrentPage>
                <BreadcrumbLink>Project 1</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem mr={2}>
                <BreadcrumbLink>First Part</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Heading size='md' mb={4}>
              Heading title
            </Heading>
            <TaskItem name={'Task 1'} />
            <TaskItem name={'Task 2'} dueDate={'May 30, 2021'} />
            <TaskItem name={'Task 3'} dueDate={'May 19, 2021'} />
            <Button variant='link' size='md' my={10} justifyContent>
              New Project...
            </Button>
            <Heading size='md' as='h2' mb={4}>
              Done
            </Heading>
            <TaskItem name={'Task 0'} dueDate={'October 13, 2014'} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
