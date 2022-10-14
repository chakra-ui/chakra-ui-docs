import { MDXComponents } from 'components/mdx-components'
import ComponentDocsLayout from 'layouts/component'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import * as React from 'react'
import {
  getComponentTabsData,
  getDocByType,
  getDocDoc,
} from 'utils/contentlayer-utils'

export default function Page({
  doc,
  tabsData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Component = useMDXComponent(doc?.body?.code)

  return (
    <ComponentDocsLayout frontmatter={doc?.frontMatter} tabsData={tabsData}>
      <Component components={MDXComponents} />
    </ComponentDocsLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = locales.flatMap((locale) =>
    getDocByType('components').flatMap((doc) => {
      return { params: { slug: doc.slug.split('/').slice(4) }, locale }
    }),
  )

  return { paths: paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const tabsData = getComponentTabsData(
    ['components', ctx.params.slug],
    ctx.locale,
    ctx.defaultLocale,
  )

  return {
    props: {
      doc: getDocDoc(
        ['components', ctx.params.slug],
        ctx.locale,
        ctx.defaultLocale,
      ),
      tabsData,
    },
  }
}
