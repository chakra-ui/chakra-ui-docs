import { Resource } from 'components/resource-card'
import { doesResourceContainQuery } from '../filter-resources'

describe('doesResourceContainQuery', () => {
  const mockResource: Resource = {
    heading: 'Mock Heading',
    type: 'blog',
    description: 'Some mock description',
    url: 'https://example.com',
    author: 'Some Name',
    tags: ['CHAKRA'],
  }

  it('should return true if resource contains query', () => {
    const mockQuery = 'name mock'
    expect(doesResourceContainQuery(mockQuery, mockResource)).toBeTruthy()
  })

  it('should return true if resource contains query with different casing', () => {
    const mockQuery = 'MOcK'
    expect(doesResourceContainQuery(mockQuery, mockResource)).toBeTruthy()
  })

  it('should return true if resource contains multiple words in query and at least one is in resource', () => {
    const mockQuery = 'name other'
    expect(doesResourceContainQuery(mockQuery, mockResource)).toBeTruthy()
  })

  it('should return false if resource does not contain query', () => {
    const mockQuery = 'no match'
    expect(doesResourceContainQuery(mockQuery, mockResource)).toBeFalsy()
  })
})
