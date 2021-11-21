import { Resource } from '../components/resource-card'

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
  const parsedQuery = query.split(" ").filter(text => text.trim() !== "")
  const resourceText = getResourceText(resource)

  return parsedQuery.find(text => resourceText.includes(text.toLowerCase())) !== undefined
}

/**
 * Function used to convert a resource into a single string, which makes it simpler
 * to search above
 */
function getResourceText(resource: Resource) {
  let text = ""

  for (const key in resource) {
    let resourceKeyValue = resource[key]
    if (typeof resourceKeyValue !== "string") {
      resourceKeyValue = resourceKeyValue.join(' ')
    }
    text += resourceKeyValue
  }

  return text.toLowerCase()
}