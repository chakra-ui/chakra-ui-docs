import path from 'path';
import { addLeadingSlash, getEditUrl } from '@docusaurus/utils';
import { Dict } from '@chakra-ui/utils';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';
import slugger from 'github-slugger';

export async function serializeMdx(source: string) {
  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [
        require('remark-autolink-headings'),
        require('remark-emoji'),
        require('remark-images'),
        require('remark-slug'),
        require('remark-toc'),
        require('remark-unwrap-images'),
      ],
    },
    scope: data,
  });
  return {
    source: mdxSource,
    frontMatter: data,
  };
}

export async function processFrontmatter<Options extends Dict>(
  options: Options
) {
  const {
    path: mdxPath,
    author,
    tags = [],
    baseEditUrl = null,
    slug: _slug,
    ...rest
  } = options;

  // get headings
  const headings = rest.mdxContent ? getTableOfContents(rest.mdxContent) : [];

  // get the edit url
  const editUrl = getEditUrl(path.join(mdxPath), baseEditUrl);

  // get the slug
  const slug = _slug || fileToPath(mdxPath);

  const data = {
    ...rest,
    slug,
    lastEdited: '',
    headings,
    editUrl,
    author,
    tags,
  };

  return data as typeof data & Options & { slug?: string; date?: string };
}

function fileToPath(str: string) {
  return addLeadingSlash(str.replace('.mdx', ''));
}

//see https://github.com/hashicorp/next-mdx-remote/issues/53#issuecomment-725906664
export function getTableOfContents(mdxContent: string) {
  const regexp = new RegExp(/^(### |## )(.*)\n/, 'gm');
  // @ts-ignore
  const headings = [...mdxContent.matchAll(regexp)];
  let tableOfContents = [];

  if (headings.length) {
    tableOfContents = headings.map((heading) => {
      const headingText = heading[2].trim();
      const headingType = heading[1].trim() === '##' ? 'h2' : 'h3';
      const headingLink = slugger.slug(headingText, false);

      return {
        text: headingText,
        id: headingLink,
        level: headingType,
      };
    });
  }

  return tableOfContents;
}
