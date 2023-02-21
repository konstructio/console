export const formatDomain = (link: string) => {
  if (!link) {
    return link;
  }

  const url = new URL(link);

  const domainOrPath = `${url.pathname.length > 1 ? url.pathname.substring(1) : url.hostname}`;

  return domainOrPath;
};
