import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { useTranslation } from 'react-i18next';
import locales from '../../i18n/locales';
import {
  chakra,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  Button,
  Text,
  useToast,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ChevronDownIcon } from '@chakra-ui/icons';

type Props = {
  withLabel?: boolean;
};

const LanguageSwitcher = ({ withLabel }: Props) => {
  const { i18n } = useTranslation();
  const { replace } = useRouter();
  const toast = useToast();

  const changeLanguage = (locale: string) => {
    i18n.changeLanguage(locale, (error) => {
      if (!error) {
        replace('', '', { locale });
      } else {
        toast({
          title: 'Cannot change the language...',
          description: 'An error happened while changing the language',
          status: 'error',
          isClosable: true,
        });
      }
    });
  };

  if (!process.env.ENABLE_LANGUAGE_SWITCHER) {
    return <></>;
  }

  return (
    <Menu>
      <MenuButton as={Button} variant='ghost' rightIcon={<ChevronDownIcon />}>
        {i18n.language
          ? getUnicodeFlagIcon(i18n.language.split('-')[1])
          : getUnicodeFlagIcon('US')}
        {withLabel && (
          <chakra.span ml={2}>{locales.localeNames[i18n.language]}</chakra.span>
        )}
      </MenuButton>
      <MenuList color={mode('gray.800', 'white')}>
        {locales.locales.map((locale) => (
          <MenuItem key={locale} onClick={() => changeLanguage(locale)}>
            {getUnicodeFlagIcon(locale.split('-')[1])}
            <Text ml={2}>{locales.localeNames[locale]}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageSwitcher;
