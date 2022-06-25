import { MDXComponents } from 'components/mdx-components'
import Layout from 'layouts'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { getDocByType, getDocDoc } from 'utils/contentlayer-utils'

export default function Page({
  doc,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Component = useMDXComponent(doc?.body?.code)
  return (
    <Layout frontMatter={doc?.frontMatter}>
      <Component components={MDXComponents} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getDocByType('styled-system').map((doc) => ({
    params: { slug: doc.slug.split('/').slice(3) },
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: { doc: getDocDoc(['styled-system', ctx.params.slug]) },
  }
}
