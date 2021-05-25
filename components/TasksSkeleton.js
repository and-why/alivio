import { Box } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import React from 'react';

const SkeletonRow = ({ width }) => (
  <Box>
    <Skeleton height='10px' w={width} my={4} pb={2} />
  </Box>
);

const TasksSkeleton = () => {
  return (
    <Box>
      <SkeletonRow width='175px' />
      <SkeletonRow width='225px' />
      <SkeletonRow width='180px' />
      <SkeletonRow width='130px' />
      <SkeletonRow width='175px' />
    </Box>
  );
};

export default TasksSkeleton;
