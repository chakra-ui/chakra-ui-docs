import { HStack, Icon, Select, SelectProps } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { RiEarthFill } from 'react-icons/ri'

const languages = [
  { label: 'English', value: 'en' },
  { label: 'Deutsch', value: 'de' },
]

export const setNextLocaleCookie = (locale) => {
  document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000; path=/`
}

export const LanguageSwitcher = (props: SelectProps) => {
  const router = useRouter()

  const { pathname, query, asPath, locale } = router

  return (
    <HStack>
      <Icon as={RiEarthFill} />
      <Select
        marginEnd='0rem'
        variant='unstyled'
        fontWeight='semibold'
        color='gray.600'
        _dark={{ color: 'whiteAlpha.600' }}
        value={locale}
        aria-label={`Select the language in which you want to read the docs.`}
        onChange={(e) => {
          router.replace({ pathname, query }, asPath, {
            locale: e.target.value,
          })
        }}
        {...props}
      >
        {languages.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </HStack>
  )
}
