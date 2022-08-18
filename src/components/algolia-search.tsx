import { SearchIcon } from '@chakra-ui/icons'
import {
  HStack,
  HTMLChakraProps,
  Kbd,
  Text,
  VisuallyHidden,
  chakra,
} from '@chakra-ui/react'
import * as React from 'react'
import { t } from 'utils/i18n'

const ACTION_KEY_DEFAULT = ['Ctrl', 'Control']
const ACTION_KEY_APPLE = ['⌘', 'Command']

export const SearchButton = React.forwardRef(function SearchButton(
  props: HTMLChakraProps<'button'>,
  ref: React.Ref<HTMLButtonElement>,
) {
  const [actionKey, setActionKey] = React.useState<string[]>(ACTION_KEY_APPLE)
  React.useEffect(() => {
    if (typeof navigator === 'undefined') return
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
    if (!isMac) {
      setActionKey(ACTION_KEY_DEFAULT)
    }
  }, [])

  return (
    <chakra.button
      flex='1'
      type='button'
      mx='6'
      ref={ref}
      lineHeight='1.2'
      w='100%'
      bg='white'
      whiteSpace='nowrap'
      display={{ base: 'none', sm: 'flex' }}
      alignItems='center'
      color='gray.600'
      _dark={{ bg: 'gray.700', color: 'gray.400' }}
      py='3'
      px='4'
      outline='0'
      _focus={{ shadow: 'outline' }}
      shadow='base'
      rounded='md'
      {...props}
    >
      <SearchIcon />
      <HStack w='full' ml='3' spacing='4px'>
        <Text textAlign='left' flex='1'>
          {t('component.algolia-search.search-the-docs')}
        </Text>
        <HStack spacing='4px'>
          <VisuallyHidden>
            {t('component.algolia-search.press')}{' '}
          </VisuallyHidden>
          <Kbd rounded='2px'>
            <chakra.div
              as='abbr'
              title={actionKey[1]}
              textDecoration='none !important'
            >
              {actionKey[0]}
            </chakra.div>
          </Kbd>
          <VisuallyHidden> {t('component.algolia-search.and')} </VisuallyHidden>
          <Kbd rounded='2px'>K</Kbd>
          <VisuallyHidden>
            {' '}
            {t('component.algolia-search.to-search')}
          </VisuallyHidden>
        </HStack>
      </HStack>
    </chakra.button>
  )
})
