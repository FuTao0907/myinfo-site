import { getSiteConfig as getPublicSiteConfig } from '~/shared/lib/public-content'
import type { SiteConfig } from '~/shared/types/site-config'

/**
 * Returns the site config through the domains layer.
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  return getPublicSiteConfig()
}
