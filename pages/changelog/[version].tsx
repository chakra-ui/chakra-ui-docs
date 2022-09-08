import { allChangelogs } from 'contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import semverMaxSatisfying from 'semver/ranges/max-satisfying'
import { useMDXComponent } from 'next-contentlayer/hooks'
import React from 'react'
import { MDXComponents } from 'components/mdx-components'
import MDXLayout from 'layouts/mdx'

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

export const getStaticPaths = () => {
  return {
    paths: [
      ...allChangelogs.map((doc) => ({
        params: { version: doc.version },
      })),
      {
        params: { version: 'latest' },
      },
    ],
    fallback: false,
  }
}

export const getStaticProps = async (ctx) => {
  let versionParam = ctx.params.version

  if (versionParam === 'latest') {
    versionParam = semverMaxSatisfying(
      allChangelogs.map(({ version }) => version),
      '*',
    )
  }

  const doc = allChangelogs.find(({ version }) => version === versionParam)

  return {
    props: { doc },
  }
}
