export const checkI18nSlug = (path: string, slug: string) => {
  return (
    slug?.startsWith(`/${path}`) ||
    slug?.startsWith(`/../i18n/__generated__/${path}`)
  );
};
