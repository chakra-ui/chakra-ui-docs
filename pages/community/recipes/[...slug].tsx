import { allRecipes } from 'contentlayer/generated'
import { GetStaticPaths, InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { MDXComponents } from 'components/mdx-components'
import MDXLayout from 'layouts/mdx'
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
    allRecipes
      .filter((recipe) => recipe.slug.includes(`/community/recipes`))
      .map((recipe) => ({
        // using _id here to prevent index to be cut of from z-index
        params: { slug: recipe._id.replace('.mdx', '').split('/').slice(3) },
        locale,
      })),
  )

  return { paths, fallback: false }
}

export const getStaticProps = async (ctx) => {
  const params = toArray(ctx.params.slug)

  let doc = allRecipes.find(
    (recipe) =>
      recipe._id.startsWith(`${ctx.locale}/community/recipes`) &&
      recipe._id.replace('.mdx', '').endsWith(`${params.join('/')}`),
  )

  if (!doc) {
    doc = allRecipes.find(
      (recipe) =>
        recipe._id.startsWith(`${ctx.defaultLocale}/community/recipes`) &&
        recipe._id.replace('.mdx', '').endsWith(`${params.join('/')}`),
    )
  }

  return { props: { doc } }
}
