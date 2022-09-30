import {
  AspectRatio,
  Box,
  BoxProps,
  Button,
  Container,
  HStack,
  Heading,
  Link,
  SimpleGrid,
  VStack,
  chakra,
  useBreakpointValue,
} from '@chakra-ui/react'
import { motion, useMotionTemplate, useSpring } from 'framer-motion'
import NextLink from 'next/link'
import { FocusEvent, PointerEvent, useCallback, useEffect, useRef } from 'react'
import { FaArrowRight } from 'react-icons/fa'

import showcaseData from 'configs/showcase.json'
import { t } from 'utils/i18n'
import { ChakraNextUnwrappedImage } from './chakra-next-image'

const MotionBox = motion<Omit<BoxProps, 'style'>>(Box)

const websites = showcaseData.splice(0, 8).map(({ name, image, url }) => ({
  src: image,
  href: url,
  alt: name,
}))

const ShowcaseSection = () => {
  const itemsRef = useRef<HTMLDivElement>()
  const isXlDown = useBreakpointValue({ base: true, xl: false })

  const x = useSpring(0, { stiffness: 100, mass: 0.1, damping: 30 })

  const xTranslate = useMotionTemplate`translateX(${x}px)`

  const setTranslateXToRight = useCallback(() => {
    const translateX =
      -itemsRef.current.scrollWidth + itemsRef.current.clientWidth
    x.set(translateX)
  }, [x])

  useEffect(() => {
    const optimizeTranslateX = (e: WindowEventMap['resize']) => {
      if (e.currentTarget['innerWidth'] > 1280 && x.get() < 0) {
        setTranslateXToRight()
      } else if (isXlDown) {
        x.set(0)
      }
    }

    if (window) {
      window.addEventListener('resize', optimizeTranslateX)
    }

    return () => {
      window.removeEventListener('resize', optimizeTranslateX)
    }
  }, [x, isXlDown, setTranslateXToRight])

  const updateTranslateX = (
    e: PointerEvent<HTMLAnchorElement> | FocusEvent<HTMLAnchorElement>,
  ) => {
    if (!itemsRef.current) return
    if (isXlDown) {
      x.set(0)
    } else {
      const xPosition = e.currentTarget.getBoundingClientRect().left
      const elementWidth = e.currentTarget.clientWidth

      if (xPosition < 0) {
        x.set(0)
      } else if (elementWidth + xPosition > itemsRef.current.clientWidth) {
        setTranslateXToRight()
      }
    }
  }

  const ShowcaseItem = ({
    src,
    href,
    alt,
  }: {
    src: string
    href: string
    alt: string
  }) => {
    return (
      <Link
        isExternal
        href={href}
        role='group'
        onPointerEnter={updateTranslateX}
        onFocus={updateTranslateX}
        w={{
          base: 'full',
          xl: '27.5vw',
        }}
        p={2}
        rounded='md'
        overflow='hidden'
        transition='0.25s transform ease-out, 0.25s box-shadow ease-out'
        _hover={{ transform: 'translateY(-10px)' }}
        _focus={{
          transform: 'translateY(-10px)',
          shadow: 'outline',
        }}
      >
        <VStack position='relative' alignItems='flex-start'>
          <AspectRatio ratio={16 / 9} w='full'>
            <ChakraNextUnwrappedImage
              alt={alt}
              src={
                src
                  ? /^(https|http)/.test(src)
                    ? src
                    : `/${src}`
                  : '/og-image.png'
              }
              layout='fill'
              objectFit='cover'
              transition='0.25s box-shadow ease-out'
              _groupHover={{ shadow: 'lg' }}
              _groupFocus={{ shadow: 'lg' }}
              rounded='sm'
            />
          </AspectRatio>
          <HStack spacing={6}>
            <Heading
              fontSize='md'
              _groupHover={{ color: 'teal.500' }}
              _groupFocus={{ color: 'teal.500' }}
              transition='0.25s color ease-out'
            >
              {alt}
            </Heading>
          </HStack>
        </VStack>
      </Link>
    )
  }

  return (
    <Box as='section' overflow='hidden' mb={12}>
      <Container py='7.5rem' maxW='1280px'>
        <Box maxW='760px' mx='auto' textAlign='center'>
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
        width='full'
        px={{ base: 4, xl: 8 }}
        style={{
          transform: xTranslate,
        }}
      >
        <SimpleGrid
          columns={{ base: 1, md: 2, xl: 4 }}
          gap={12}
          width={{ base: 'full', xl: '116vw' }}
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
