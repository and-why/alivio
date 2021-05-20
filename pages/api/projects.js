import db from '@/lib/firebase-admin';

const projectsData = async (_, res) => {
  const snapshot = await db.collection('projects').get();

  const projects = [];

  snapshot.forEach((doc) => {
    projects.push({ id: doc.id, ...doc.data() });
  });

  res.status(200).json({ projects });
};

export default projectsData;
