import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        color: 'gray.700',
        lineHeight: 'tall',
        fill: 'grey.700',
      },
      a: {
        color: 'teal.500',
      },
    },
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 600,
  },
});

export default theme;
