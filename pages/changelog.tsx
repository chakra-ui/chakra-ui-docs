import { allChangelogs } from 'contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import React from 'react'
import { MDXComponents } from 'components/mdx-components'
import Layout from 'layouts'

export default function Page({
  doc,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Component = useMDXComponent(doc.body.code)
  return (
    <Layout frontMatter={doc.frontMatter}>
      <Component components={MDXComponents} />
    </Layout>
  )
}

export const getStaticProps = async () => {
  return {
    props: { doc: allChangelogs[0] },
  }
}
