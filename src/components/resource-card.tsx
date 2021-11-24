import {
  Badge,
  BoxProps,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem,
  VStack
} from '@chakra-ui/react';
import * as React from 'react';

export interface Resource {
  heading: string;
  type: 'blog' | 'talk' | 'video';
  description: string;
  url: string;
  author: string;
  tags?: string[];
}

interface ResourceCardProps extends BoxProps {
  data: Resource;
}

function ResourceCard(props: ResourceCardProps) {
  const { data, ...rest } = props;
  const { heading, author, description, url, tags } = data;
  const color = useColorModeValue('teal.600', 'teal.400');

  return (
    <LinkBox
      {...rest}
      maxW='360px'
      p={4}
      rounded='lg'
      _hover={{ transform: 'scale(1.025)' }}
      bg={useColorModeValue('gray.50', 'gray.700')}
    >
      <VStack spacing={2} align='stretch'>
        <Wrap className='algolia-exclude' spacing='3' mb='2' align='center'>
          {tags?.map((tag, index) => (
            <WrapItem key={index}>
              <Badge
                as='a'
                rel='tag'
                color={color}
                textTransform='uppercase'
                fontSize='xs'
                fontWeight='bold'
              >
                {tag}
              </Badge>
            </WrapItem>
          ))}
        </Wrap>

        <Heading as='h3' size='sm'>
          <LinkOverlay isExternal href={url}>
            <span className='content'>{heading}</span>
          </LinkOverlay>
        </Heading>
        <Text fontSize='sm' color='gray.500'>
          by {author}
        </Text>
        <Text lineHeight='tall' py={2} opacity={0.8}>
          {description}
        </Text>
      </VStack>
    </LinkBox>
  );
}

export default ResourceCard;
