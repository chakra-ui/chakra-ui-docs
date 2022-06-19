export type MixedArray = string | Array<string | string[]>

export function toArray(slug: MixedArray) {
  return Array.isArray(slug) ? slug.flat() : [slug]
}

export function uniq<T>(c: T[]) {
  return [...new Set(c)]
}

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)
