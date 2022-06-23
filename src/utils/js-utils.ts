export type MixedArray = string | Array<string | string[]>

export function toArray(slug: MixedArray) {
  const res = Array.isArray(slug) ? slug.flat() : [slug]
  return res.filter(Boolean)
}

export function uniq<T>(c: T[]) {
  return [...new Set(c)]
}

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)
