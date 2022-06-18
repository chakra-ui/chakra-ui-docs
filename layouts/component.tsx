import { Box, HStack, Stack } from '@chakra-ui/react'
import { MDXComponents } from 'components/mdx-components'
import { Doc } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { getComponentTabsData } from 'utils/contentlayer-utils'
import { MDXLayout } from './index'

function MDXContent({ doc }: { doc: Doc | undefined }) {
  const Component = useMDXComponent(doc?.body?.code ?? '')
  return <Component components={MDXComponents} />
}

export default function ComponentDocsLayout({ children, frontmatter }) {
  const { slug = [] } = frontmatter ?? {}

  const isComponent = slug.includes('/components')
  const id = frontmatter.package?.split('/').pop()

  const router = useRouter()
  const data = getComponentTabsData(router.query.slug)

  return (
    <MDXLayout frontmatter={frontmatter}>
      {id && (
        <Stack spacing='5'>
          <MDXComponents.p>{frontmatter.description}</MDXComponents.p>
          <MDXComponents.ComponentLinks
            theme={{ componentName: id }}
            github={{ package: id }}
            npm={{ package: frontmatter.package }}
          />
        </Stack>
      )}

      {isComponent && (
        <Box as='nav' aria-label='Component navigation' mt='8'>
          <HStack as='ul' listStyleType='none' borderBottomWidth='1px'>
            {data.map((item) => (
              <Box as='li' key={item.id}>
                <NextLink href={item.href} passHref replace>
                  <Box
                    mb='-1px'
                    as='a'
                    display='block'
                    fontSize='sm'
                    px='5'
                    py='3'
                    fontWeight='medium'
                    borderBottom='2px solid transparent'
                    data-selected={item.match ? '' : undefined}
                    _selected={{
                      color: 'brand',
                      borderColor: 'currentColor',
                    }}
                  >
                    {item.label}
                  </Box>
                </NextLink>
              </Box>
            ))}
          </HStack>
        </Box>
      )}

      {data.map((item, index) => (
        <Box key={index} id={item.id} hidden={!data[index].match}>
          {index === 0 ? children : <MDXContent doc={item.doc} />}
        </Box>
      ))}
    </MDXLayout>
  )
}
