import React, { useState, useEffect, useRef } from 'react';

import { Accordion } from '@chakra-ui/accordion';
import { Flex, Heading, Link } from '@chakra-ui/layout';

import ProjectAccordion from './ProjectAccordion';
import FormNewProject from './FormNewProject';
import { useAuth } from '../lib/auth';
import { getProjectData } from '../lib/db';

export default function Sidebar() {
  const auth = useAuth();
  const uid = auth.user.uid;
  const [formOpen, setFormOpen] = useState(false);
  const [data, setData] = useState();

  console.log(data);
  function handleProjectInput() {
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

  useEffect(() => {
    setData(getProjectData);
  }, [getProjectData]);

  return (
    <Flex height='100%' p={4} minWidth='300px'>
      <Flex flexDirection='column' width='100%' onKeyDown={escFunction}>
        <Heading as='h2' size='md'>
          Projects
        </Heading>
        <Accordion defaultIndex={[0]} allowMultiple width='100%'>
          <ProjectAccordion projectName={'Project 2'} />
        </Accordion>

        {formOpen ? (
          <FormNewProject handleOpenState={handleOpenState} />
        ) : (
          <Link size='md' p={2} mt={10} justifyContent='flex-start' onClick={handleProjectInput}>
            New Project...
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
