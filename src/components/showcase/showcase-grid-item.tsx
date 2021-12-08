import { GridItem } from '@chakra-ui/layout'
import type { ResponsiveValue } from '@chakra-ui/react'

interface ShowcaseGridItemProps {
  colSpan: ResponsiveValue<number | 'auto'>
  rowSpan: ResponsiveValue<number | 'auto'>
}

const ShowcaseGridItem: React.FC<ShowcaseGridItemProps> = ({
  children,
  colSpan,
  rowSpan,
}) => {
  return (
    <GridItem
      colSpan={colSpan}
      rowSpan={rowSpan}
      justifySelf='center'
      alignSelf='center'
      rounded='lg'
      position='relative'
      role='group'
      boxShadow='md'
    >
      {children}
    </GridItem>
  )
}

export default ShowcaseGridItem
