import { allChangelogs } from 'contentlayer/generated'
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from 'next'
import { useRouter } from 'next/router'
import semverMaxSatisfying from 'semver/ranges/max-satisfying'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { useEffect } from 'react'
import { MDXComponents } from 'components/mdx-components'
import ChangelogLayout from 'layouts/changelog'

export default function Page({
  doc,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Component = useMDXComponent(doc.body.code)
  const router = useRouter()

  useEffect(() => {
    if (router.query.version === 'latest') {
      router.replace(`/changelog/${doc.version}`)
    }
  }, [router, doc])

  return (
    <ChangelogLayout hideToc frontmatter={doc.frontMatter}>
      <Component components={MDXComponents} />
    </ChangelogLayout>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
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

export const getStaticProps: GetStaticProps = async (ctx) => {
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
