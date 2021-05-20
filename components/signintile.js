import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/layout';
import Image from 'next/image';
import { useAuth } from '@/lib/auth';

export default function Signintile(props) {
  const auth = useAuth();
  const name = props.name;

  return (
    <Button
      px='4'
      mx='4'
      leftIcon={<Image width={20} height={20} src={`/images/${name}_logo.svg`} alt='Github Logo' />}
      onClick={(e) => {
        if (name == 'Github') {
          auth.signinWithGithub();
        } else if (name == 'Twitter') {
          auth.signinWithTwitter();
        } else if (name === 'Google') {
          auth.signinWithGoogle();
        }
      }}
    >
      <Text></Text>
      {name}
    </Button>
  );
}
