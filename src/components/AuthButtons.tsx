import { Button, HStack } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';

const AuthButtons = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') return null;

  return (
    <HStack spacing={2}>
      {session ? (
        <>
          <Button colorScheme="pink" variant="outline" onClick={() => signOut()}>
            Вийти
          </Button>
          <span style={{ fontWeight: 'bold', color: '#7928CA' }}>{session.user?.email}</span>
        </>
      ) : (
        <>
          <Button colorScheme="pink" onClick={() => signIn('google')}>
            Увійти через Google
          </Button>
          <Button colorScheme="teal" onClick={() => signIn('email')}>
            Увійти через Email
          </Button>
        </>
      )}
    </HStack>
  );
};

export default AuthButtons;
