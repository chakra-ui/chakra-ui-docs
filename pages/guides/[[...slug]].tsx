import { allGuides } from '.contentlayer/data'
import type { Guide } from '.contentlayer/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { MDXComponents } from 'components/mdx-components'
import Layout from 'layouts'

export default function Page({ guide }: { guide: Guide }) {
  const Component = useMDXComponent(guide.body.code)
  return (
    <Layout frontMatter={guide.frontMatter}>
      <Component components={MDXComponents} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const guides = allGuides
    .map((t) => t._id.replace('guides/', '').replace('.mdx', ''))
    .map((id) => ({ params: { slug: id.split('/') } }))
  return { paths: guides, fallback: false }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const params = Array.isArray(ctx.params.slug)
    ? ctx.params.slug
    : [ctx.params.slug]
  const guide = allGuides.find((guide) =>
    guide._id.endsWith(`${params.join('/')}.mdx`),
  )
  return { props: { guide } }
}
