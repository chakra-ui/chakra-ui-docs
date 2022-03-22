import {
  Center,
  HStack,
  IconButton,
  List,
  ListItem,
  ListProps,
  useDisclosure,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { MainNavLink, mainNavLinks } from 'components/sidebar/sidebar'

export const MainNavLinkGroup = (props: ListProps & { compact: boolean }) => {
  return (
    <List spacing='4' styleType='none' {...props}>
      {mainNavLinks.map((item) => (
        <ListItem key={item.label}>
          <MainNavLink icon={item.icon} href={item.href} label={item.label}>
            {!props.compact ? item.label : null}
          </MainNavLink>
        </ListItem>
      ))}
    </List>
  )
}

export const TutorialSidebar = () => {
  const ref = useRef<HTMLDivElement>(null)

  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <HStack
      ref={ref}
      as='nav'
      aria-label='Main Navigation'
      pos='sticky'
      overscrollBehavior='contain'
      top='4.5rem'
      w={isOpen ? '220px' : '50px'}
      h='calc(100vh - 8.125rem)'
      pb='6'
      pl='6'
      pt='4'
      overflowY='auto'
      flexShrink={0}
      _hover={{ cursor: 'pointer' }}
      onClick={onOpen}
      alignItems='flex-start'
      justify={'space-between'}
    >
      <MainNavLinkGroup mb='10' compact={!isOpen} />
      {isOpen && (
        <Center height='100%'>
          <IconButton
            aria-label='collapse menu'
            icon={<MdOutlineArrowBackIosNew />}
            variant={'ghost'}
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
          />
        </Center>
      )}
    </HStack>
  )
}
