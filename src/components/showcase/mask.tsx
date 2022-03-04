import {
  Box,
  Flex,
  HStack,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/layout'

interface MaskProps {
  name: string
  url?: string
  showMask?: boolean
}

const Mask: React.FC<MaskProps> = ({ name, url, showMask }) => (
  <LinkBox
    as={Flex}
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
            <LinkOverlay
              isExternal
              aria-label={`Go to ${name} website`}
              href={url}
              w='full'
              px={4}
            >
              <Text isTruncated color='teal.400'>
                {url}
              </Text>
            </LinkOverlay>
          )}
        </HStack>
      </Box>
    </Box>
  </LinkBox>
)

export default Mask
