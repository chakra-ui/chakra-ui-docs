import {
  AspectRatio,
  Box,
  Button,
  chakra,
  Container,
  Flex,
  Link,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  useBreakpointValue,
  BoxProps,
} from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { useEffect, useRef } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'
import {
  motion,
  MotionValue,
  useSpring,
  useMotionTemplate,
} from 'framer-motion'

import { t } from 'utils/i18n'
import LazarsWebsite from "public/showcases/websites/Lazar-Nikolov's-Site.png"
import ChakraTemplates from 'public/showcases/projects/Chakra-Templates.png'
import ChakraUIPro from 'public/showcases/projects/Chakra-UI-Pro.png'
import ChocUI from 'public/showcases/projects/Choc-UI.png'
import Snappify from 'public/showcases/projects/Snappify.png'
import ThirdWeb from 'public/showcases/projects/Third-Web.png'
import UIFoundations from 'public/showcases/projects/UI-Foundations.png'
import HyperThemeEditor from 'public/showcases/tools/HyperTheme-Editor.png'
import useHasTouch from 'hooks/use-has-touch'

type Website = {
  src: StaticImageData
  href: string
  alt: string
}

const MotionBox = motion<Omit<BoxProps, 'style'>>(Box)

const websites: Website[] = [
  {
    src: ThirdWeb,
    href: 'https://thirdweb.com/',
    alt: 'Third Web',
  },
  {
    src: Snappify,
    href: 'https://snappify.io/',
    alt: 'Snappify',
  },
  {
    src: HyperThemeEditor,
    href: 'https://www.hyperthe.me/',
    alt: 'HyperTheme Editor',
  },
  {
    src: UIFoundations,
    href: 'https://www.uifoundations.com/',
    alt: 'UI Foundations',
  },
  {
    src: ChakraUIPro,
    href: 'https://pro.chakra-ui.com',
    alt: 'Chakra UI Pro',
  },
  {
    src: ChakraTemplates,
    href: 'https://chakra-templates.dev',
    alt: 'Chakra Templates',
  },
  {
    src: ChocUI,
    href: 'https://choc-ui.tech/',
    alt: 'Choc UI',
  },
  {
    src: LazarsWebsite,
    href: 'https://nikolovlazar.com',
    alt: "Lazar Nikolov's Site",
  },
]

const ShowcaseSection = () => {
  const itemsRef = useRef<HTMLDivElement>()
  const hasTouch = useHasTouch()
  const isMdDown = useBreakpointValue({ base: true, md: false })

  const shouldScrollItems = !(hasTouch || isMdDown)

  const x = useSpring(0, { stiffness: 100, mass: 0.1, damping: 30 })

  const xTranslate = useMotionTemplate`translateX(${x}px)`

  const updateRowTranslate = (e: MouseEvent, value: MotionValue<number>) => {
    const scrollWidth = itemsRef.current?.scrollWidth - e.view.outerWidth
    const xPosition = e.x
    const position = xPosition / e.view.outerWidth
    const translateX = position * -scrollWidth
    value.set(translateX)
  }

  const resetTranslate = (value: MotionValue<number>) => {
    value.set(0)
  }

  useEffect(() => {
    const ref = itemsRef.current

    if (shouldScrollItems && ref) {
      ref.addEventListener('mousemove', (e) => updateRowTranslate(e, x))
      ref.addEventListener('mouseleave', () => resetTranslate(x))
    }

    return () => {
      ref?.removeEventListener('mousemove', (e) => updateRowTranslate(e, x))
      ref.removeEventListener('mouseleave', () => resetTranslate(x))
    }
  }, [itemsRef, shouldScrollItems, x])

  const ShowcaseItem = ({
    src,
    href,
    alt,
  }: {
    src: StaticImageData
    href: string
    alt: string
  }) => {
    return (
      <LinkBox>
        <Box
          position='relative'
          role='group'
          w={{ base: 'full', md: shouldScrollItems ? '27.5vw' : 'full' }}
          transition='0.25s transform ease-out'
          _hover={{ transform: 'translateY(-10px)' }}
        >
          <AspectRatio ratio={16 / 9} w='full'>
            <Image
              alt={alt}
              src={src}
              layout='fill'
              objectFit='cover'
              placeholder='blur'
            />
          </AspectRatio>
          <Flex
            alignItems='center'
            justifyContent='center'
            position='absolute'
            inset={0}
            bg='blackAlpha.500'
            opacity={0}
            transition='0.25s opacity ease-out'
            _groupHover={{
              opacity: 1,
            }}
          >
            <LinkOverlay href={href} isExternal>
              <NextLink href={href} passHref>
                <Button
                  fontSize='1.2rem'
                  as={Link}
                  size='lg'
                  isExternal
                  bg='white'
                  color='gray.900'
                  rightIcon={<FiArrowUpRight fontSize='0.8em' />}
                >
                  {t('homepage.built-with-chakra-section.see-showcase')}
                </Button>
              </NextLink>
            </LinkOverlay>
          </Flex>
        </Box>
      </LinkBox>
    )
  }

  return (
    <Box as='section' overflow='hidden' mb={12}>
      <Container py='7.5rem' maxW='1280px'>
        <Box spacing={5} maxW='760px' mx='auto' textAlign='center'>
          <chakra.h2 textStyle='heading' mb={4}>
            {t('homepage.built-with-chakra-section.title')}
          </chakra.h2>
          <chakra.p opacity={0.7} fontSize='lg' mb={8}>
            {t('homepage.built-with-chakra-section.description')}
          </chakra.p>
          <NextLink href='/showcase' passHref>
            <Button
              h='4rem'
              px='40px'
              fontSize='1.2rem'
              as='a'
              size='lg'
              colorScheme='teal'
              rightIcon={<FaArrowRight fontSize='0.8em' />}
            >
              {t('homepage.built-with-chakra-section.see-showcase')}
            </Button>
          </NextLink>
        </Box>
      </Container>
      <MotionBox
        ref={itemsRef}
        width={{ base: 'full', md: shouldScrollItems ? 'fit-content' : 'full' }}
        px={{ base: 10, xl: 0 }}
        style={{
          transform: xTranslate,
        }}
      >
        <SimpleGrid
          columns={{ base: 1, md: 2, xl: 4 }}
          gap={12}
          width={{ base: 'full', md: shouldScrollItems ? '116vw' : 'full' }}
        >
          {websites.map(({ src, href, alt }, index) => (
            <ShowcaseItem key={index} src={src} href={href} alt={alt} />
          ))}
        </SimpleGrid>
      </MotionBox>
    </Box>
  )
}

export default ShowcaseSection
