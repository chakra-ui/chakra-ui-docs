import { Box, Icon, Link, Stack, chakra } from '@chakra-ui/react'
import * as React from 'react'
import { MdEdit } from 'react-icons/md'
import { t } from 'utils/i18n'

const EditPageLink = ({ href }: { href?: string }) => {
  return (
    <Link href={href} isExternal>
      <Box fontSize='sm' textAlign='right'>
        <Stack
          display='inline-flex'
          direction='row'
          spacing={1}
          align='center'
          opacity={0.7}
        >
          <Icon as={MdEdit} mr='1' />
          <chakra.span>
            {t('component.edit-page-button.edit-this-page')}
          </chakra.span>
        </Stack>
      </Box>
    </Link>
  )
}

export default EditPageLink
