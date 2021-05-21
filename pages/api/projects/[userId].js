import { getAllProjects } from '@/lib/admin-db';

const projectsData = async (req, res) => {
  const uid = req.query.userId;
  const projects = await getAllProjects(uid);

  res.status(200).json({ projects });
};

export default projectsData;
