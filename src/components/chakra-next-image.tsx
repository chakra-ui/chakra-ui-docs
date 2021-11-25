import { chakra } from '@chakra-ui/system'
import { Flex } from '@chakra-ui/layout'
import type { FlexProps } from '@chakra-ui/layout'
import NextImage, { ImageProps, ImageLoaderProps } from 'next/image'

const ChakraNextUnwrappedImage = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    [
      'width',
      'height',
      'src',
      'alt',
      'quality',
      'placeholder',
      'blurDataURL',
      'loader ',
    ].includes(prop),
})
const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`

const myLoader = (resolverProps: ImageLoaderProps): string => {
  return `${resolverProps.src}?w=${resolverProps.width}&q=${resolverProps.quality}`
}

const ChakraNextImage = (props: ImageProps & FlexProps) => {
  const { src, width, height, alt, quality, ...rest } = props
  return (
    <Flex
      pos='relative'
      cursor='pointer'
      className='group'
      boxShadow='1px 1px 10px 5px rgba(0, 0, 0, .25)'
      overflow='hidden'
      {...rest}
    >
      <ChakraNextUnwrappedImage
        w='auto'
        h='auto'
        loader={myLoader}
        width={width}
        quality={quality}
        height={height}
        placeholder='blur'
        blurDataURL={`data:image/svg+xml;base64,${toBase64(
          shimmer(+width, +height),
        )}`}
        src={src}
        alt={alt}
        transition='all 0.2s'
      />
    </Flex>
  )
}

export default ChakraNextImage
