import { Box } from '@chakra-ui/react'
// import { useRouter } from 'next/router'
import { useRef } from 'react'
import { MainNavLinkGroup } from 'components/sidebar/sidebar'

export const TutorialSidebar = () => {
  // const { pathname } = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  return (
    <Box
      ref={ref}
      as='nav'
      aria-label='Main Navigation'
      pos='sticky'
      overscrollBehavior='contain'
      top='6.5rem'
      w='200px'
      h='calc(100vh - 8.125rem)'
      pb='6'
      pl='6'
      pt='4'
      overflowY='auto'
      className='sidebar-content'
      flexShrink={0}
      display={{ base: 'none', md: 'block' }}
    >
      <MainNavLinkGroup mb='10' />
    </Box>
  )
}
