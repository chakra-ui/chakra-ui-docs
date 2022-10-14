import { MDXComponents } from 'components/mdx-components'
import { allGuides, Guide } from 'contentlayer/generated'
import MDXLayout from 'layouts/mdx'
import { GetStaticPaths, InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { toArray } from 'utils/js-utils'

export default function Page({
  doc,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Component = useMDXComponent(doc.body.code)
  return (
    <MDXLayout frontmatter={doc.frontMatter}>
      <Component components={MDXComponents} />
    </MDXLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = locales.flatMap((locale) =>
    allGuides
      .filter((guide) => guide.slug.includes(`/getting-started`))
      .map((guide) => ({
        params: { slug: guide.slug.split('/').slice(3) },
        locale,
      })),
  )

  return { paths, fallback: false }
}

export const getStaticProps = async (ctx) => {
  const params = toArray(ctx.params.slug)

  let doc: Guide
  if (params.length === 0) {
    doc = allGuides.find(
      (guide) => guide.slug === `/${ctx.locale}/getting-started`,
    )

    if (!doc) {
      doc = allGuides.find(
        (guide) => guide.slug === `/${ctx.defaultLocale}/getting-started`,
      )
    }
  } else {
    doc = allGuides.find(
      (guide) =>
        guide.slug.startsWith(`/${ctx.locale}/getting-started`) &&
        guide.slug.endsWith(`${params.join('/')}`),
    )

    if (!doc) {
      doc = allGuides.find(
        (guide) =>
          guide.slug.startsWith(`/${ctx.defaultLocale}/getting-started`) &&
          guide.slug.endsWith(`${params.join('/')}`),
      )
    }
  }
  return { props: { doc } }
}
