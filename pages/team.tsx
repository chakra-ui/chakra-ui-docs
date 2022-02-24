import fs from 'fs'
import {
  Avatar,
  Box,
  Heading,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
  WrapItem,
  chakra,
} from '@chakra-ui/react'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'
import * as React from 'react'
import { IoIosGlobe, IoLogoGithub, IoLogoTwitter } from 'react-icons/io'
import { AdBanner } from 'components/chakra-pro/ad-banner'
import Container from 'components/container'
import Header from 'components/header'
import PageTransition from 'components/page-transition'
import SEO from 'components/seo'
import { Contributor, Member as IMember } from 'src/types/github'
import { t } from 'utils/i18n'

function SocialLink({ icon, href }) {
  return (
    <Link
      display='inline-flex'
      alignItems='center'
      justifyContent='center'
      rounded='full'
      href={href}
      isExternal
    >
      <Icon
        as={icon}
        transition='all 0.2s'
        _hover={{ color: 'teal.600' }}
        fontSize='xl'
        color='teal.500'
      />
    </Link>
  )
}

function Member({ member }: { member: IMember }) {
  const {
    avatar_url: avatarUrl,
    bio,
    name,
    twitter_username: twitterUsername,
    blog: websiteUrl,
    url,
  } = member

  return (
    <Box>
      <Stack direction='row' spacing={6}>
        <Avatar size='xl' src={avatarUrl} />
        <Stack spacing={3} maxW='320px'>
          <Text fontWeight='bold' fontSize='md'>
            {name}
          </Text>

          <Stack isInline align='center' spacing={2}>
            <SocialLink href={url} icon={IoLogoGithub} />
            {twitterUsername && (
              <SocialLink
                href={`https://twitter.com/${twitterUsername}`}
                icon={IoLogoTwitter}
              />
            )}
            {websiteUrl && <SocialLink href={websiteUrl} icon={IoIosGlobe} />}
          </Stack>
          <Text>{bio}</Text>
        </Stack>
      </Stack>
    </Box>
  )
}

interface TeamProps {
  members: IMember[]
  contributors: Contributor[]
}

function Team({ members, contributors }: TeamProps) {
  const memberLogins = members.map(({ login }) => login)
  const contributorsWithoutTeam = contributors.filter(
    ({ login }) => !memberLogins.includes(login),
  )

  return (
    <>
      <SEO
        title={t('team.seo.title')}
        description={t('team.seo.description')}
      />
      <SkipNavLink zIndex={20}>Skip to Content</SkipNavLink>
      <AdBanner />
      <Header />

      <Box mt='3rem' mb='60px'>
        <SkipNavContent />
        <PageTransition>
          <Container py='80px' textAlign='center'>
            <chakra.h1
              color='teal.500'
              textStyle='heading'
              mb='5'
              fontWeight='bold'
            >
              {t('team.title')}
            </chakra.h1>
            <Text maxW='56ch' mx='auto' fontSize='lg'>
              {t('team.message')}
            </Text>
          </Container>

          <Container>
            <Stack spacing={8}>
              <Heading size='lg'>{t('team.core-team')}</Heading>
              <SimpleGrid columns={[1, 1, 2]} spacing='40px' pt='3'>
                {members.map((member) => (
                  <Member key={member.login} member={member} />
                ))}
              </SimpleGrid>
            </Stack>

            <Stack py='48px' spacing={8}>
              <Heading size='lg'>{t('team.our-sponsors')}</Heading>

              <Box>
                <Text
                  textStyle='caps'
                  mb='4'
                  textTransform='uppercase'
                  opacity='0.7'
                >
                  {t('team.organizations')}
                </Text>
                <Wrap>
                  {new Array(9).fill('').map((_, idx) => (
                    <WrapItem
                      as='a'
                      key={idx}
                      href={`https://opencollective.com/chakra-ui/organization/${idx}/website`}
                    >
                      <img
                        alt='OpenCollective Organization Avatar'
                        src={`https://opencollective.com/chakra-ui/organization/${idx}/avatar.svg?avatarHeight=130`}
                      />
                    </WrapItem>
                  ))}
                </Wrap>
              </Box>
              <Box>
                <Text
                  textStyle='caps'
                  mb='4'
                  textTransform='uppercase'
                  opacity='0.7'
                >
                  {t('team.individuals')}
                </Text>
                <a href='https://opencollective.com/chakra-ui'>
                  <img
                    alt='OpenCollective Individual Avatar'
                    src='https://opencollective.com/chakra-ui/individuals.svg?width=890'
                  />
                </a>
              </Box>
            </Stack>

            <Stack spacing={8} mt={{ base: '40px', md: '100px' }}>
              <Heading size='lg'>{t('team.project-contributors')}</Heading>
              <Wrap spacing='3'>
                {contributorsWithoutTeam.map((contributor) => (
                  <WrapItem
                    as={Avatar}
                    key={contributor.login}
                    src={contributor.avatar_url}
                  />
                ))}
              </Wrap>
            </Stack>
          </Container>
        </PageTransition>
      </Box>
    </>
  )
}

export async function getStaticProps() {
  /**
   * Read the profile/bio of each member from `.all-membersrc` file
   * to avoid overfetching from Github
   */
  const { members } = JSON.parse(fs.readFileSync('.all-membersrc', 'utf-8'))

  /**
   * Read contributors from `.all-contributorsrc` file
   * to avoid overfetching from Github
   */
  const { contributors } = JSON.parse(
    fs.readFileSync('.all-contributorsrc', 'utf-8'),
  )

  return {
    props: {
      members,
      contributors,
    },
  }
}

export default Team
