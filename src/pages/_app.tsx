import { ChakraProvider, Flex } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';

import theme from '../theme';
import { AppProps } from 'next/app';
import { Footer } from '../components/Footer';
import { Main } from '../components/Main';
import { Header } from '../components/Header';
import { Container } from '../components/Container';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Loader } from '../components/Loader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <SessionProvider>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Flex direction="column" minH="100vh">
            <Header />
            <Container flex="1">
              <Main>{loading ? <Loader /> : <Component {...pageProps} />}</Main>
            </Container>
            <Footer />
          </Flex>
        </QueryClientProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
