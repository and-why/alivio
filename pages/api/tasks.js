import { getUserTasks } from '@/lib/admin-db';
import { auth } from '@/lib/firebase-admin';

const tasksData = async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const tasks = await getUserTasks(uid);

    res.status(200).json(tasks);
  } catch (error) {
    res.status(200).json(error);
  }
};

export default tasksData;
