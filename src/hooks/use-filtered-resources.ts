import * as React from 'react'
import MiniSearch from 'minisearch'
import { Resource } from '../components/resource-card'

/**
 * Hook used for getting a list of filtered resources for the resources page.
 * The main reason for this is to abstract all the code associated to setting
 * up the library and usage of that library away from the component.  Essentially,
 * it's responsible for setting up the library and then invoking when appropriate.
 */
 function useFilteredResources(query: string, resources: Resource[]): Resource[] {
  const resourceKeys = ['heading', 'description', 'author', 'tags', 'type', 'url'];
  const miniSearch = React.useMemo(() => {
    // Create instance
    const miniSearchInstance = new MiniSearch({
      idField: 'heading',
      fields: ['heading', 'description', 'author', 'tags'], // index
      storeFields: resourceKeys
    })

    // Add resources that will be indexed and searched
    miniSearchInstance.addAll(resources)

    return miniSearchInstance
  }, [resources])

  /**
   * HACK: Helper function used to strip out all unnecessary keys
   */
  function filterResourcesNew(): Resource[] {
    const results = miniSearch.search(query, { fuzzy: 0.2, prefix: true })
    return results.map(result => ({
      heading: result.heading,
      description: result.description,
      author: result.author,
      tags: result.tags,
      type: result.type,
      url: result.url
    }))
  }

  return query.trim() !== '' ? filterResourcesNew() : resources
}

export default useFilteredResources