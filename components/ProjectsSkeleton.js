import { Box } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import React from 'react';

const SkeletonRow = ({ width }) => (
  <Box>
    <Skeleton height='10px' w={width} my={4} pb={2} />
  </Box>
);

const ProjectsSkeleton = () => {
  return (
    <Box>
      <SkeletonRow width='75px' />
      <SkeletonRow width='125px' />
      <SkeletonRow width='80px' />
      <SkeletonRow width='100px' />
      <SkeletonRow width='75px' />
    </Box>
  );
};

export default ProjectsSkeleton;
