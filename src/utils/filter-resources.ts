import { Resource } from "../components/resource-card"

/**
 * Main function used in resources page; it's a convenient wrapper for the logic needed
 * to accomplish the filtering of resources within a tab
 */
export default function filterResources(query: string, resources: Resource[]): Resource[] {
  return query.trim() !== "" ? resources.filter((resource: Resource) => doesResourceContainQuery(query, resource)) : resources
}

/**
 * Function that does the actual "searching" within a given resource.
 * Notice that it takes into account where a query might have spaces;
 * this allows it to treat each word as a search term, rather than treating
 * the entire input string as one search term, which would limit user results.
 * It is exported to test this function specifically, which is simpler.
 */
export function doesResourceContainQuery(query: string, resource: Resource) {
  const parsedQuery = query.split(" ").filter(text => text.trim() !== "") // get rid of whitespace/empty strings for more results
  const resourceText = getResourceText(resource)

  return parsedQuery.find(text => resourceText.includes(text.toLowerCase())) !== undefined
}

/**
 * Function used to convert a resource into a single string, which makes it simpler
 * to search above.  Notice, it only searches specific parts of a resource.
 */
function getResourceText(resource: Resource) {
  const {
    heading,
    description,
    author
  } = resource

  return `${heading} ${description} ${author} ${"tags" in resource ? resource.tags.join(" ") : ""}`.toLowerCase()
}