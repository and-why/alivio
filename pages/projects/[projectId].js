import { useState } from 'react';
import useSWR from 'swr';
import { DragDropContext } from 'react-beautiful-dnd';
import { Flex, Heading, Link, Spinner } from '@chakra-ui/react';

import DashboardShell from '@/components/DashboardShell';
import FormNewTask from '@/components/forms/FormNewTask';
import TaskItem from '@/components/TaskItem';
import { getAllProjects, getAllTasks } from '@/lib/admin-db';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import TasksSkeleton from '@/components/TasksSkeleton';

export default function ProjectPage({ projectId, projectName }) {
  const { user } = useAuth();
  const { data, error } = useSWR(user ? [`/api/tasks`, user.token] : null, fetcher);
  const [formSectionOpen, setFormSectionOpen] = useState(false);
  const [formTaskOpen, setFormTaskOpen] = useState(false);
  function handleSectionForm() {
    setFormSectionOpen(true);
  }
  function handleTaskForm() {
    setFormTaskOpen(true);
  }
  function handleOpenSectionState() {
    setFormSectionOpen(false);
  }
  function handleOpenTaskState() {
    setFormTaskOpen(false);
  }

  if (!user) {
    return (
      <Flex h='100vh' w='100vw' justify='center' align='center'>
        <Spinner size='xl' speed='0.65s' thickness='5px' />
      </Flex>
    );
  }
  return (
    <DashboardShell>
      <Flex direction='column' w='100%'>
        <Heading as='h2' size='md' mb={4}>
          {projectName}
        </Heading>
        {!data ? (
          <TasksSkeleton />
        ) : (
          <Flex direction='column'>
            {data.tasks.map((task) => {
              if (projectId == task.projectId) {
                return <TaskItem key={task.id} task={task} />;
              }
            })}
            {formTaskOpen ? (
              <FormNewTask projectId={projectId} handleOpenState={handleOpenTaskState} />
            ) : (
              <Link
                fontSize='md'
                color='gray.500'
                justifyContent='flex-start'
                onClick={handleTaskForm}
              >
                + Add Task...
              </Link>
            )}
          </Flex>
        )}
      </Flex>
    </DashboardShell>
  );
}

export async function getStaticProps(context) {
  const projectId = context.params.projectId;
  const tasks = await getAllTasks();
  const { projects } = await getAllProjects();
  const project = projects.find((project) => project.projectId == projectId);
  return {
    props: {
      tasks: tasks,
      projectId,
      projectName: project.projectName,
    },
  };
}
export async function getStaticPaths() {
  const { projects } = await getAllProjects();
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
