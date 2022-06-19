import { allRecipes } from 'contentlayer/generated'
import { GetStaticPaths, InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { MDXComponents } from 'components/mdx-components'
import Layout from 'layouts'
import { toArray } from 'utils/js-utils'

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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allRecipes
    .map((t) => t._id.replace('recipes/', '').replace('.mdx', ''))
    .map((id) => ({ params: { slug: id.split('/') } }))
  return { paths, fallback: false }
}

export const getStaticProps = async (ctx) => {
  const params = toArray(ctx.params.slug)
  const doc = allRecipes.find((receipe) =>
    receipe._id.endsWith(`${params.join('/')}.mdx`),
  )
  return { props: { doc } }
}
