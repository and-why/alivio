import { auth } from '@/lib/firebase-admin';
import { getUserProjects } from '@/lib/admin-db';

const projectsData = async (req, res) => {
  try {
    console.log(req);
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const projects = await getUserProjects(uid);

    res.status(200).json(projects);
  } catch (error) {
    res.status(200).json(error);
  }
};

export default projectsData;
