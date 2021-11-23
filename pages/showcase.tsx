import { Box } from '@chakra-ui/react'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'
import SEO from 'components/seo'
import Header from 'components/header'
import { AdBanner } from 'components/chakra-pro/ad-banner'
import { t } from 'utils/i18n'

const Showcase = () => {
  return (
    <>
      <SEO
        title={t('showcase.seo.title')}
        description={t('showcase.seo.description')}
      />
      <SkipNavLink zIndex={20}>Skip to Content</SkipNavLink>
      <AdBanner />
      <Header />
      <Box mt={20}>
        <SkipNavContent />
        Showcase
      </Box>
    </>
  )
}

export default Showcase
