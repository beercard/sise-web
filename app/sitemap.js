import { seoRoutes, siteConfig } from './lib/seo';

export default function sitemap() {
  const lastModified = new Date();

  return seoRoutes.map((route) => ({
    url: `${siteConfig.siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));
}
