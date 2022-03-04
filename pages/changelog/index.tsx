import { allChangelogs } from '.contentlayer/data'
import { Changelog } from '.contentlayer/types'
import { GetStaticProps } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import React from 'react'
import { MDXComponents } from 'components/mdx-components'
import Layout from 'layouts'

export default function Page({ doc }: { doc: Changelog }) {
  const Component = useMDXComponent(doc.body.code)
  return (
    <Layout frontMatter={doc.frontMatter}>
      <Component components={MDXComponents} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { doc: allChangelogs[0] },
  }
}
