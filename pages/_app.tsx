import { ChakraProvider } from '@chakra-ui/react';
import FontFace from 'components/font-face';
import { I18nextProvider } from 'react-i18next';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import React, { useEffect } from 'react';
import theme from 'theme';
import { getSeo } from 'utils/seo';

import i18n from '../i18n';
import { useRouter } from 'next/router';

const App = ({ Component, pageProps }) => {
  const seo = getSeo();
  const { locale: pathLanguage, replace } = useRouter();

  useEffect(() => {
    let localStorageLanguage = localStorage.getItem('i18nextLng');
    if (!localStorageLanguage) {
      localStorageLanguage = 'en-US';
      localStorage.setItem('i18nextLng', localStorageLanguage);
    }
    if (pathLanguage !== localStorageLanguage) {
      replace('', '', { locale: localStorageLanguage });
    }
  }, []);

  return (
    <>
      <Head>
        <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link rel='icon' type='image/png' sizes='96x96' href='/favicon.png' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://static.cloudflareinsights.com' />
        <meta name='theme-color' content='#319795' />
        {process.env.NODE_ENV === 'production' && (
          <script
            async
            defer
            data-domain='chakra-ui.com'
            src='https://plausible.io/js/plausible.js'
          />
        )}
      </Head>
      <DefaultSeo {...seo} />
      <ChakraProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <Component {...pageProps} />
        </I18nextProvider>
      </ChakraProvider>
      <FontFace />
    </>
  );
};

export default App;
