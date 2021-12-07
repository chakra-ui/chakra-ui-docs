import { Box, Flex, Text, Link, HStack } from '@chakra-ui/layout'
import { LinkIcon, Icon } from '@chakra-ui/icons'
import { GithubIcon } from 'components/icons'
import _ from 'lodash'

interface MaskProps {
  name: string
  url?: string
  github?: string
  showMask?: boolean
}

const Mask: React.FC<MaskProps> = ({ name, url, github, showMask }) => (
  <Flex
    w='full'
    h='full'
    position='absolute'
    rounded='md'
    bg='blackAlpha.400'
    opacity={showMask ? 1 : 0}
    justifyContent='center'
    alignItems='flex-end'
    zIndex={showMask ? 2 : -1}
    _groupHover={{
      zIndex: 2,
      opacity: 1,
    }}
    transition='.5s opacity ease-out'
  >
    <Box
      w='full'
      borderBottomRadius='md'
      bgColor='blackAlpha.700'
      opacity='1'
      py='2.5'
    >
      <Box as='span' color='white' mx='auto'>
        <Text
          px='10px'
          fontSize={{ lg: 'lg', base: 'md' }}
          fontWeight='700'
          letterSpacing='1.2px'
          noOfLines={2}
        >
          {name}
        </Text>
        <HStack mt='1' alignItems='center' justifyContent='center' spacing='3'>
          {url && (
            <Link
              isExternal
              aria-label={`Go to ${name} website`}
              href={url}
              w={!github ? 'full' : 'auto'}
              px={4}
            >
              {!github && <Text isTruncated>{url}</Text>}
              {github && (
                <Icon
                  as={LinkIcon}
                  display='block'
                  transition='color 0.2s'
                  w='5'
                  h='5'
                  _hover={{ color: 'gray.600' }}
                />
              )}
            </Link>
          )}
          {github && (
            <Link
              isExternal
              aria-label={`Go to ${name} GitHub page`}
              href={github}
              w={!url ? 'full' : 'auto'}
              px={4}
            >
              {!url && <Text isTruncated>{github}</Text>}
              {url && (
                <Icon
                  as={GithubIcon}
                  display='block'
                  transition='color 0.2s'
                  w='5'
                  h='5'
                  _hover={{ color: 'gray.600' }}
                />
              )}
            </Link>
          )}
        </HStack>
      </Box>
    </Box>
  </Flex>
)

export default Mask
