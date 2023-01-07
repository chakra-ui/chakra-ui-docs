import { Box, Icon, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { ImNpm } from "react-icons/im"
import { FaYarn } from "react-icons/fa"
import { SiPnpm } from "react-icons/si"

import CodeBlock from "./mdx-components/codeblock/codeblock"

type PackageManager = {
  name: string
  icon: JSX.Element
  color: string
  command: string
}

const packageManagers: PackageManager[] = [
  {
    name: "npm",
    icon: <Icon as={ImNpm} />,
    color: '#CC3534',
    command: "npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion",
  },
  {
    name: "yarn",
    icon: <Icon as={FaYarn} fontSize="lg" />,
    color: '#428CBA',
    command: "yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion",
  },
  {
    name: "pnpm",
    icon: <Icon as={SiPnpm} />,
    color: '#F2AF1F',
    command: "pnpm add @chakra-ui/react @emotion/react @emotion/styled framer-motion",
  },
]


export const PackageManagers = () => {
  return (
    <Tabs my={4}>
      <TabList>
        {packageManagers.map(({ name, icon, color }) => (
          <Tab key={name} gap={2} _selected={{
            color,
          }}>
            {icon}
            {name}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {packageManagers.map(({ command }) => (
          <TabPanel key={command} p={0} mt={-4}>
            <CodeBlock>
              <Box className="language-bash">
                {command}
              </Box>
            </CodeBlock>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}
