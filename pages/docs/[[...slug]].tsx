import { MDXComponents } from 'components/mdx-components'
import Layout from 'layouts'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { getDocDoc, getDocPaths } from 'utils/contentlayer-utils'

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
  return { paths: getDocPaths(), fallback: false }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  return { props: { doc: getDocDoc(ctx.params.slug) } }
}
