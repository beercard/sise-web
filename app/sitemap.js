import { seoRoutes, siteConfig } from './lib/seo';

export default function sitemap() {
  return seoRoutes.map((route) => ({
    url: `${siteConfig.siteUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));
}
