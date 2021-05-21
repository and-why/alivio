import { useState } from 'react';
import useSWR from 'swr';

import { ChevronRightIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Accordion, AccordionButton, AccordionItem, AccordionPanel } from '@chakra-ui/accordion';
import { Box, Flex, Link, Text } from '@chakra-ui/layout';

import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import TaskItemList from '@/components/TaskItemList';
import FormNewTask from './forms/FormNewTask';

export default function ProjectAccordion({ projects }) {
  const auth = useAuth();
  const uid = auth.user.uid;
  const { data, error } = useSWR(`/api/tasks/${uid}`, fetcher);
  const [formOpen, setFormOpen] = useState(false);
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
    <Flex direction='column'>
      <Accordion allowMultiple>
        {projects.map((project) => {
          return (
            <AccordionItem key={project.projectId} border='none'>
              {({ isExpanded }) => (
                <>
                  <AccordionButton _expanded={{ fontWeight: 'bold' }} px={0}>
                    {isExpanded ? (
                      <ChevronDownIcon w={6} h={6} />
                    ) : (
                      <ChevronRightIcon w={6} h={6} />
                    )}
                    <Box>{project.projectName}</Box>
                  </AccordionButton>
                  <AccordionPanel py={0} px={3}>
                    <Box p={2} borderLeft='solid 1px #b1b1b1'>
                      {!data ? (
                        <Box color='gray.500'>No Projects Yet</Box>
                      ) : (
                        <TaskItemList projectId={project.id} tasks={data.tasks} />
                      )}
                    </Box>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </Flex>
  );
}
