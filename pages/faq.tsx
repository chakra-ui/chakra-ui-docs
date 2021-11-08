import PageContainer from "components/page-container";
import Sidebar from "components/sidebar/sidebar";
import { getRoutes } from "layouts/mdx";
import faq from "configs/faq.json";
import { useTranslation } from "react-i18next";
import { Box, Heading, Stack, Text } from "@chakra-ui/layout";

interface QuestionAnswer {
  question: string;
  answer: string;
}

const Faq = () => {
  const { t } = useTranslation();

  /**
   * Re-use the docs sidebar so it's easier for a visitors
   * to reference components mentioned in the resource blog/video.
   */
  const routes = getRoutes("/docs/");
  const data = faq.qa as QuestionAnswer[];

  return (
    <PageContainer
      sidebar={<Sidebar routes={routes} />}
      frontmatter={{
        title: t("faq.title"),
        description: t("faq.description"),
      }}
    >
      <Text mt="2">{t("faq.description")}</Text>

      <Stack as="section" spacing="12" mt="12">
        {data.map((item, index) => (
          <Box key={index}>
            <Heading as="h2" size="md">
              {item.question}
            </Heading>
            <Text>{item.answer}</Text>
          </Box>
        ))}
      </Stack>
    </PageContainer>
  );
};

export default Faq;
