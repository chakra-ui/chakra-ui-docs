import { Resource } from '../components/resource-card'

export default function filterResources(query: string, resources: Resource[]): Resource[] {
  return resources.filter((resource: Resource) => doesResourceContainQuery(query, resource))
}

export function doesResourceContainQuery(query: string, resource: Resource) {
  const parsedQuery = query.split(" ").filter(text => text.trim() !== "")
  const resourceText = getResourceText(resource)

  return parsedQuery.find(text => resourceText.includes(text.toLowerCase())) !== undefined
}

/**
 * @TODO Assess update to function to be able to scale with resource better
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