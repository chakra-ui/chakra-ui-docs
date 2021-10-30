import { useState } from 'react';
import { Select, SelectProps, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';

function VersionSwitcher(props: SelectProps) {
  const router = useRouter();
  const [chakraVersion] = useState<string>('1.x.x');

  const versions = [
    { label: `v${chakraVersion}`, url: 'https://chakra-ui.com' },
    { label: 'v0.8.x', url: 'https://v0.chakra-ui.com' },
  ];

  const v1Url = versions[0].url;

  return (
    <Select
      marginEnd='0rem'
      variant='unstyled'
      fontWeight='semibold'
      color={useColorModeValue('gray.600', 'whiteAlpha.600')}
      value={v1Url}
      aria-label="Select the Chakra UI Docs version. You're currently viewing the version 1.0 docs"
      onChange={(e) => {
        router.push(e.target.value);
      }}
      {...props}
    >
      {versions.map(({ label, url }) => (
        <option key={url} value={url}>
          {label}
        </option>
      ))}
    </Select>
  );
}

export default VersionSwitcher;
