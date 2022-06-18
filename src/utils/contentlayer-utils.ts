import { allDocs } from 'contentlayer/generated'
import { memoize } from 'lodash'

function uniq<T>(c: T[]) {
  return [...new Set(c)]
}

function getDocByType(id: string) {
  return allDocs.filter((doc) => doc.slug.startsWith(`/docs/${id}`))
}

function getComponentSlugs() {
  return uniq(
    getDocByType('components').flatMap((doc) => [
      doc.slug,
      `/${doc._raw.sourceFileDir}`,
    ]),
  )
}

export function getGroupedComponents<T extends { category: string }>(
  docs: T[],
) {
  return docs.reduce((acc, doc) => {
    const category = doc.category
    if (!acc[category]) acc[category] = []
    acc[category].push(doc)
    return acc
  }, {} as Record<T['category'], T>)
}

function getDocSlugs() {
  return [
    ...getComponentSlugs(),
    ...allDocs
      .filter((doc) => !doc._id.startsWith(`/docs/components`))
      .map((doc) => doc.slug),
  ]
}

export function getDocPaths() {
  return getDocSlugs().map((doc) => ({
    params: { slug: doc.split('/').slice(2) },
  }))
}

const getUsageDoc = memoize((id: string) => {
  return allDocs.find((_doc) => _doc.id === id && _doc.scope === 'usage')
})

export const getDocDoc = memoize((slug: string | string[]) => {
  const params = Array.isArray(slug) ? slug : [slug]
  const _slug = params.join('/')
  const doc = allDocs.find(
    (doc) => doc.slug.endsWith(_slug) || doc.slug.endsWith(`${_slug}/usage`),
  )
  doc.frontMatter = {
    ...doc.frontMatter,
    ...(getUsageDoc(doc.id)?.frontMatter ?? {}),
  }
  return doc
})

export function getComponentTabsData(slug: string | string[]) {
  const params = Array.isArray(slug) ? slug : [slug]
  const _slug = params.join('/')

  const getSlug = (id: string) => {
    const res = uniq([...params, id])
    if (res.length > 3) res.splice(2, 1)
    return res
  }

  const usageSlug = getSlug('usage')
  const propsSlug = getSlug('props')
  const themingSlug = getSlug('theming')

  return [
    {
      id: 'usage',
      match: _slug.endsWith('/usage') || params.length === 2,
      href: { query: { slug: usageSlug } },
      label: 'Usage',
      doc: getDocDoc(getSlug('usage')),
    },
    {
      id: 'props',
      match: _slug.endsWith('/props'),
      href: { query: { slug: propsSlug } },
      label: 'Props',
      doc: getDocDoc(getSlug('props')),
    },
    {
      id: 'theming',
      match: _slug.endsWith('/theming'),
      label: 'Theming',
      href: { query: { slug: themingSlug } },
      doc: getDocDoc(getSlug('theming')),
    },
  ]
}
