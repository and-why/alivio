import React, { useState, useEffect, useRef } from 'react';
import useSWR from 'swr';

import { Accordion } from '@chakra-ui/accordion';
import { Flex, Heading, Link } from '@chakra-ui/layout';

import ProjectAccordion from './ProjectAccordion';

import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import ProjectsAccordionSkeleton from './ProjectsAccordionSkeleton';
import FormNewProject from './forms/FormNewProject';

export default function Sidebar() {
  const auth = useAuth();
  const uid = auth.user.uid;
  const [formOpen, setFormOpen] = useState(false);
  const { data, error } = useSWR(`/api/projects/${uid}`, fetcher);

  function handleInput() {
    setFormOpen(true);
  }
  function handleOpenState() {
    setFormOpen(false);
  }
  const escFunction = (e) => {
    if (e.keyCode === 27) {
      setFormOpen(false);
    }
  };

  return (
    <Flex height='100%' p={4} minWidth='300px'>
      <Flex flexDirection='column' width='100%' onKeyDown={escFunction}>
        <Heading as='h2' size='md'>
          Projects
        </Heading>
        {!data ? <ProjectsAccordionSkeleton /> : <ProjectAccordion projects={data.projects} />}
        {formOpen ? (
          <FormNewProject handleOpenState={handleOpenState} />
        ) : (
          <Link
            color='gray.500'
            size='md'
            p={2}
            mt={10}
            justifyContent='flex-start'
            onClick={handleInput}
          >
            Create New Project...
          </Link>
        )}
      </Flex>
    </Flex>
  );
}

// {data.map((project) => {
//   console.log(project);
//   <ProjectAccordion projectName={'Project 1'} />;
// })}
