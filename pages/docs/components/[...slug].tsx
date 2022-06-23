import { MDXComponents } from 'components/mdx-components'
import Layout from 'layouts'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { getDocByType, getDocDoc } from 'utils/contentlayer-utils'
import { uniq } from 'utils/js-utils'

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
  const paths = uniq(
    getDocByType('components').flatMap((doc) => [
      doc.slug,
      `/${doc._raw.sourceFileDir}`,
    ]),
  )
  return { paths: paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  return { props: { doc: getDocDoc(['components', ctx.params.slug]) } }
}
