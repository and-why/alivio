import { getAllTasks } from '@/lib/admin-db';

const tasksData = async (req, res) => {
  const uid = req.query.userId;
  const tasks = await getAllTasks(uid);

  res.status(200).json({ tasks });
};

export default tasksData;
