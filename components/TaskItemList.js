import { useState } from 'react';
import NextLink from 'next/link';
import { Box, Heading, Link } from '@chakra-ui/layout';

import FormNewTask from '@/components/forms/FormNewTask';
import { Flex } from '@chakra-ui/react';

// export default function TaskItemList({ tasks, projectId }) {
//   const [formOpen, setFormOpen] = useState(false);
//   function handleInput() {
//     setFormOpen(true);
//   }
//   function handleOpenState() {
//     setFormOpen(false);
//   }
//   const escFunction = (e) => {
//     if (e.keyCode === 27) {
//       setFormOpen(false);
//     }
//   };
//   return (
//     <Flex direction='column'>
//       {tasks.map((task) => {
//         if (task.projectId === projectId) {
//           return <Link>{task.taskName}</Link>;
//         }
//       })}
//       {formOpen ? (
//         <FormNewTask projectId={projectId} handleOpenState={handleOpenState} />
//       ) : (
//         <Link size='md' mt={4} color='gray.500' justifyContent='flex-start' onClick={handleInput}>
//           Create New Task...
//         </Link>
//       )}
//     </Flex>
//   );
// }
