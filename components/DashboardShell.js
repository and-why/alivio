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

const DashboardShell = ({ children }) => {
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
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
