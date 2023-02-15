import { MDXComponents } from 'components/mdx-components'
import { allFigmas } from 'contentlayer/generated'
import MDXLayout from 'layouts/mdx'
import { GetStaticPaths, InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'

export default function Page({
  figma,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Component = useMDXComponent(figma.body.code)
  return (
    <MDXLayout frontmatter={figma.frontMatter}>
      <Component components={MDXComponents} />
    </MDXLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const figmas = locales.flatMap((locale) =>
    allFigmas
      .filter((figma) => figma.slug.includes('/figma'))
      .map((figma) => ({
        params: { slug: figma.slug.split('/').slice(3) },
        locale,
      })),
  )

  return { paths: figmas, fallback: false }
}

export const getStaticProps = async (ctx) => {
  const params = Array.isArray(ctx.params.slug)
    ? ctx.params.slug
    : [ctx.params.slug]
  let figma = allFigmas.find(
    (figma) =>
      figma.slug.startsWith(`/${ctx.locale}/figma`) &&
      figma.slug.endsWith(`${params.join('/')}`),
  )

  if (!figma) {
    figma = allFigmas.find(
      (figma) =>
        figma.slug.startsWith(`/${ctx.defaultLocale}/figma`) &&
        figma.slug.endsWith(`${params.join('/')}`),
    )
  }

  return { props: { figma } }
}
