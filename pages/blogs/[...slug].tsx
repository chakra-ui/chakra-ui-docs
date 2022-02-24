import { allBlogs } from '.contentlayer/data'
import type { Blog } from '.contentlayer/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { MDXComponents } from 'components/mdx-components'
import Layout from 'layouts'

export default function Page({ blog }: { blog: Blog }) {
  const Component = useMDXComponent(blog.body.code)
  return (
    <Layout frontMatter={blog.frontMatter}>
      <Component components={MDXComponents} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = allBlogs
    .map((t) => t._id.replace('blogs/', '').replace('.mdx', ''))
    .map((id) => ({ params: { slug: id.split('/') } }))
  return { paths: blogs, fallback: false }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const params = Array.isArray(ctx.params.slug)
    ? ctx.params.slug
    : [ctx.params.slug]
  const blog = allBlogs.find((blog) => blog._id.includes(params.join('/')))
  return { props: { blog } }
}
