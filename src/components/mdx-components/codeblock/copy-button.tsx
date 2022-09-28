import { Button, ButtonProps, useClipboard } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'

interface CopyButtonProps extends ButtonProps {
  code: string
}

function CopyButton({ code, ...props }: CopyButtonProps) {
  const { hasCopied, onCopy } = useClipboard(code)
  const { t } = useTranslation()
  return (
    <Button
      size='sm'
      position='absolute'
      textTransform='uppercase'
      colorScheme='teal'
      fontSize='xs'
      height='24px'
      top={0}
      zIndex='1'
      right='1.25em'
      {...props}
      onClick={onCopy}
    >
      {hasCopied
        ? t('component.mdx-components.copy-button.copied')
        : t('component.mdx-components.copy-button.copy')}
    </Button>
  )
}

export default CopyButton
