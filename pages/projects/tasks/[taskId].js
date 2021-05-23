import { getAllTasks, getSingleTask } from '@/lib/admin-db';
import { useAuth } from '@/lib/auth';
import { Box, Heading } from '@chakra-ui/layout';

export function TaskPage(props) {
  const auth = useAuth();
  const uid = auth.user.uid;
  return (
    <Box>
      <Heading>{props.task}</Heading>
    </Box>
  );
}

export async function getStaticProps(context) {
  const taskId = context.params.taskId;
  console.log(taskId);
  const { task } = getSingleTask(taskId);
  return {
    props: {
      task,
    },
  };
}
export async function getStaticPaths() {
  const tasks = await getAllTasks('IjplpoANIFVGYGp1bRMSDiYwput1');
  console.log(tasks);
  const paths = tasks.map((task) => ({
    params: {
      taskId: task.id.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
