import { useState } from 'react';

import NextLink from 'next/link';
import { Flex, Link, Text } from '@chakra-ui/layout';

import { useAuth } from '@/lib/auth';

export default function ProjectList({ projects }) {
  const auth = useAuth();
  const [formOpen, setFormOpen] = useState(false);

  function handleOpenState() {
    setFormOpen(false);
  }
  const escFunction = (e) => {
    if (e.keyCode === 27) {
      setFormOpen(false);
    }
  };
  return (
    <Flex direction='column' w='100%'>
      {projects.map((project) => {
        return (
          <NextLink
            key={project.projectId}
            href='/projects/[projectId]'
            as={`/projects/${project.projectId}`}
            passHref
          >
            <Link ml={2} mb={2}>
              {project.projectName}
            </Link>
          </NextLink>
        );
      })}
    </Flex>
  );
}
