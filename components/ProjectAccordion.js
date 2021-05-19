import { ChevronRightIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/accordion';
import { Text } from '@chakra-ui/layout';

export default function ProjectAccordion({ projectName, ...data }) {
  return (
    <AccordionItem border='none'>
      {({ isExpanded }) => (
        <>
          <AccordionButton _expanded={{ fontWeight: 'bold' }} px={0}>
            {isExpanded ? <ChevronDownIcon w={6} h={6} /> : <ChevronRightIcon w={6} h={6} />}

            <Text>{projectName}</Text>
          </AccordionButton>
          <AccordionPanel py={0} px={3}>
            <Text p={2} borderLeft='solid 1px #b1b1b1'>
              Placeholder
            </Text>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
}
