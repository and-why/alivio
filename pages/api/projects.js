import { getAllProjects } from '@/lib/admin-db';

const projectsData = async (req, res) => {
  const projects = await getAllProjects();

  res.status(200).json({ projects });
};

export default projectsData;
