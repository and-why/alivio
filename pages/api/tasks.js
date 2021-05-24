import { getAllTasks } from '@/lib/admin-db';

const tasksData = async (req, res) => {
  const tasks = await getAllTasks();

  res.status(200).json({ tasks });
};

export default tasksData;
