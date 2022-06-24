import { Box, Heading, Link, Text } from '@chakra-ui/react'
import Layout from 'layouts'
import NextLink from 'next/link'

function BlogItem({ href, label, description, date, ...rest }) {
  return (
    <NextLink href={href} passHref>
      <Link
        _hover={{
          textDecor: 'none',
        }}
        {...rest}
      >
        <Heading size='lg' _hover={{ color: 'teal.500' }}>
          {label}
        </Heading>
        <Text mt='1' color='gray.500' fontSize='sm'>
          {date}
        </Text>
        <Text mt='1'>{description}</Text>
      </Link>
    </NextLink>
  )
}

function Blog() {
  return (
    <Layout
      frontMatter={{
        title: 'Chakra UI Blog',
        description: '...',
        slug: '/blog',
      }}
    >
      <BlogItem
        href='#'
        date='Thursday, 4th June, 2022'
        label='The beginners guide to building an accessible web'
        description='Web accessibility is the method of making websites and web applications usable
        by everyone.'
      />
    </Layout>
  )
}

export default Blog
