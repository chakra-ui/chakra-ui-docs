import { allBlogs } from 'contentlayer/generated'
import { GetStaticPaths, InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { MDXComponents } from 'components/mdx-components'
import { getMember } from 'utils/get-all-members'
import BlogLayout from 'layouts/blog'

export default function Page({
  blog,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Component = useMDXComponent(blog.body.code)
  return (
    <BlogLayout frontmatter={blog.frontMatter}>
      <Component components={MDXComponents} />
    </BlogLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const blogs = locales.flatMap((locale) =>
    allBlogs
      .filter((blog) => blog.slug.includes(`/blog`))
      .map((blog) => ({
        params: { slug: blog.slug.split('/').slice(3) },
        locale,
      })),
  )

  return { paths: blogs, fallback: false }
}

export const getStaticProps = async (ctx) => {
  const params = Array.isArray(ctx.params.slug)
    ? ctx.params.slug
    : [ctx.params.slug]

  const blog = allBlogs.find((blog) => blog.slug.includes(params.join('/')))
  const authorData = getMember(blog.frontMatter.author)
  blog.frontMatter.authorData = authorData

  return { props: { blog } }
}
