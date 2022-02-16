import {
  Box,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import styledSystemSidebar from 'configs/styled-system-sidebar.json'
import componentsSidebar from 'configs/components-sidebar.json'
import { useRouter } from 'next/router'
import Link from 'next/link'

const featureSidebar = {
  '/docs/styled-system/overview': styledSystemSidebar,
  '/docs/components/overview': componentsSidebar,
}

const Feature = ({ title, icon, children, ...props }) => {
  return (
    <Stack
      direction='row'
      bg={useColorModeValue('white', 'gray.700')}
      rounded='12px'
      shadow='base'
      p='6'
      {...props}
    >
      <Flex
        rounded='12px'
        w='12'
        h='12'
        bg='teal.500'
        align='center'
        justify='center'
      >
        <Icon fontSize='24px' color='white' as={icon} />
      </Flex>
      <Flex direction='column'>
        <Heading as='h3' size='sm' fontWeight='semibold' mt='1' mb='0.5'>
          {title}
        </Heading>
        <Text fontSize='md' opacity={0.7}>
          {children}
        </Text>
      </Flex>
    </Stack>
  )
}

export const FeaturesOverview = () => {
  const { asPath } = useRouter()

  const features = featureSidebar[asPath].routes[0].routes

  return (
    <SimpleGrid mt='12' minChildWidth='160px' spacing='20'>
      {features
        .filter((feature) => feature.path !== asPath)
        .map((feature) => (
          <Link key={feature.title} passHref href={feature.path}>
            <Feature icon={null} title={feature.title}>
              Test
            </Feature>
          </Link>
        ))}
    </SimpleGrid>
  )
}
