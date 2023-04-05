export const formatDomain = (link: string) => {
  if (!link) {
    return link;
  }

  const url = link?.includes('http') && new URL(link);

  if (!url) {
    return '';
  }

  const domainOrPath = `${url.pathname.length > 1 ? url.pathname.substring(1) : url.hostname}`;

  return domainOrPath;
};
