import {
  Flex,
  FlexProps,
  Box,
  Tabs,
  TabList,
  Tab,
  Link,
  useBreakpointValue,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { DarkModeSwitch } from './DarkModeSwitch';
import AuthButtons from './AuthButtons';
import { HamburgerIcon } from '@chakra-ui/icons';

const routes = [
  { label: 'Главная', href: '/' },
  { label: 'Вагони', href: '/vagons' },
  { label: 'Галерея', href: '/gallery' },
];

export const Header = (props: FlexProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const router = useRouter();
  const activeIndex = routes.findIndex((r) => r.href === router.pathname);

  return (
    <Box
      as="header"
      position="fixed"
      w="full"
      bg="gray.50"
      borderBottom="2px solid"
      borderColor="gray.300"
      _dark={{ bg: 'gray.900', borderColor: 'gray.700' }}
      {...props}
      zIndex={10}
    >
      <Flex
        maxW="1200px"
        w="full"
        mx="auto"
        px={4}
        align="center"
        justify="space-between"
        h="100px"
      >
        <Link
          as={NextLink}
          href="/"
          fontWeight="bold"
          fontSize="3xl"
          color="text"
          _hover={{ textDecoration: 'none', color: 'heroGradientStart' }}
          display="flex"
          alignItems="center"
          h="100px"
        >
          Artport
        </Link>
        {isMobile ? (
          <Menu>
            <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="outline" />
            <MenuList>
              {routes.map((route) => (
                <MenuItem as={NextLink} href={route.href} key={route.href}>
                  {route.label}
                </MenuItem>
              ))}
              <DarkModeSwitch />
              <AuthButtons />
            </MenuList>
          </Menu>
        ) : (
          <>
            <Tabs index={activeIndex} variant="line">
              <TabList
                sx={{
                  borderBottom: 'none',
                  boxShadow: 'none',
                }}
              >
                {routes.map((route) => (
                  <Tab
                    as={NextLink}
                    href={route.href}
                    key={route.href}
                    h="101px"
                    fontWeight="semibold"
                    fontSize="md"
                    color="text"
                    px={4}
                    _selected={{
                      color: 'heroGradientStart',
                      fontWeight: 'bold',
                      borderBottom: '3px solid',
                      borderColor: 'heroGradientStart',
                    }}
                    _hover={{
                      color: 'heroGradientEnd',
                      textDecoration: 'none',
                    }}
                  >
                    {route.label}
                  </Tab>
                ))}
              </TabList>
            </Tabs>
            <DarkModeSwitch />
            <AuthButtons />
          </>
        )}
      </Flex>
    </Box>
  );
};
