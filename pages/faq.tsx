import PageContainer from "components/page-container";
import Sidebar from "components/sidebar/sidebar";
import { getRoutes } from "layouts/mdx";
import faq from "configs/faq.json";
import groupBy from "lodash/groupBy";
import { useTranslation } from "react-i18next";
import { Stack, Text } from "@chakra-ui/layout";

const Faq = () => {
  const { t } = useTranslation();

  /**
   * Re-use the docs sidebar so it's easier for a visitors
   * to reference components mentioned in the resource blog/video.
   */
  const routes = getRoutes("/docs/");
  const data = faq.questions;

  return (
    <PageContainer
      sidebar={<Sidebar routes={routes} />}
      frontmatter={{
        title: t("faq.title"),
        description: t("faq.description"),
      }}
    >
      <Text mt="2">{t("faq.description")}</Text>

      <Stack as="section">
        
      </Stack>
    </PageContainer>
  );
};

export default Faq;
