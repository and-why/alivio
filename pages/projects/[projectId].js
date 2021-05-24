import DashboardShell from '@/components/DashboardShell';
import FormNewTask from '@/components/forms/FormNewTask';
import TaskItem from '@/components/TaskItem';
import { getAllProjects, getAllTasks } from '@/lib/admin-db';
import { useAuth } from '@/lib/auth';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Link,
  Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function ProjectPage({ tasks, projectId }) {
  const auth = useAuth();
  const [formOpen, setFormOpen] = useState(false);
  function handleInput() {
    setFormOpen(true);
  }
  function handleOpenState() {
    setFormOpen(false);
  }

  if (!auth.user) {
    return (
      <Flex h='100vh' w='100vw' justify='center' align='center'>
        <Spinner size='xl' speed='0.65s' thickness='5px' />
      </Flex>
    );
  }
  return (
    <DashboardShell>
      {!tasks ? (
        <Heading>No Tasks yet</Heading>
      ) : (
        <Flex direction='column'>
          {tasks.map((task) => {
            return <TaskItem key={task.id} task={task} />;
          })}
          {formOpen ? (
            <FormNewTask projectId={projectId} handleOpenState={handleOpenState} />
          ) : (
            <Link
              size='md'
              mt={4}
              color='gray.500'
              justifyContent='flex-start'
              onClick={handleInput}
            >
              Create New Task...
            </Link>
          )}
        </Flex>
      )}
    </DashboardShell>
  );
}

export async function getStaticProps(context) {
  const projectId = context.params.projectId;
  const tasks = await getAllTasks(projectId);

  return {
    props: {
      tasks: tasks,
      projectId,
    },
  };
}
export async function getStaticPaths() {
  const projects = await getAllProjects();
  const paths = projects.map((project) => ({
    params: {
      projectId: project.projectId.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
