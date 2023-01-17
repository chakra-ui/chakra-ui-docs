import { getPropDoc } from '@chakra-ui/props-docs'
import { chakra, Code, Flex, HStack, Stack } from '@chakra-ui/react'
import { InlineCode } from 'components/mdx-components/inline-code'
import * as React from 'react'
import { convertBackticksToInlineCode } from 'utils/convert-backticks-to-inline-code'
import { t } from 'utils/i18n'

export type PropsTableProps = {
  /**
   * displayName of the target component
   */
  of: string
  /**
   * prop names to omit
   */
  omit?: string[] | null
  /**
   * Render only given prop names
   * Has precedence over `omit`
   */
  only?: string[] | null
}

const PropsTable = ({
  of,
  omit = ['layerStyle', 'noOfLines', 'textStyle', 'orientation', 'styleConfig'],
  only,
}: PropsTableProps) => {
  const propList = React.useMemo(
    () => makePropsTable({ of, omit, only }),
    [of, omit, only],
  )

  if (!propList.length) {
    // this error breaks the build to notify you when there would be an empty table
    throw new Error(
      `No props left to render for component ${of}.
Remove the use of <PropsTable of="${of}" /> for this component in the docs.`,
    )
  }

  return (
    <Stack overflowX='auto' spacing='16' my='10'>
      {propList.map((prop) => (
        <chakra.div
          key={prop.name}
          css={{
            width: '100%',
            fontSize: '0.95em',
            borderCollapse: 'collapse',
            '.row': {
              minWidth: 100,
              width: '20%',
              fontSize: '0.9em',
              textAlign: 'start',
              fontWeight: 500,
              padding: '4px 16px 4px 8px',
              whiteSpace: 'nowrap',
              verticalAlign: 'baseline',
            },
            '.cell': {
              padding: '4px 0px 4px 8px',
              width: '100%',
            },
          }}
        >
          <chakra.div css={{ textAlign: 'start', fontSize: '1em' }}>
            <chakra.h3
              css={{
                fontSize: '0.8em',
                paddingBottom: 4,
                marginBottom: 16,
                borderBottomWidth: 1,
              }}
            >
              <HStack>
                <Code colorScheme='purple'>{prop.name}</Code>
                {prop.required && (
                  <Code colorScheme='red'>
                    {t('component.props-table.required')}
                  </Code>
                )}
              </HStack>
            </chakra.h3>
          </chakra.div>
          <div>
            {prop.description && (
              <Flex>
                <div className='row'>
                  {t('component.props-table.description')}
                </div>
                <div className='cell'>
                  <p>{convertBackticksToInlineCode(prop.description)}</p>
                </div>
              </Flex>
            )}
            <Flex>
              <div className='row'>{t('component.props-table.type')}</div>
              <div className='cell'>
                <InlineCode whiteSpace='normal' fontSize='0.8em'>
                  {prop.type}
                </InlineCode>
              </div>
            </Flex>
            {prop.defaultValue && (
              <Flex>
                <div className='row'>{t('component.props-table.default')}</div>
                <div className='cell'>
                  <InlineCode whiteSpace='normal' fontSize='0.8em'>
                    {prop.defaultValue}
                  </InlineCode>
                </div>
              </Flex>
            )}
          </div>
        </chakra.div>
      ))}
    </Stack>
  )
}

export default PropsTable

type MakePropsTableOptions = PropsTableProps

function makePropsTable({ of, omit, only }: MakePropsTableOptions) {
  const props = getPropDoc(of)

  if (!props) return []

  return Object.entries(props)
    .filter(([name]) => {
      if (Array.isArray(only) && !only.includes(name)) {
        return false
      }

      if (Array.isArray(omit) && omit.includes(name)) {
        return false
      }

      return true
    })
    .map(([name, value]) => ({
      name,
      ...value,
      type: cleanType(value.type),
    }))
}

function cleanType(value: any) {
  return typeof value === 'string' ? value.replace(';', '') : value
}
