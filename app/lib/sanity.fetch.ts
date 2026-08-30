import { client } from './sanity';
import { LANDING_PAGE_QUERY } from './sanity.queries';
import { LandingPageData } from '../types/sanity';

export async function getLandingPageData(): Promise<LandingPageData> {
  try {
    return await client.fetch<LandingPageData>(LANDING_PAGE_QUERY);
  } catch (error) {
    console.error('Error fetching landing page data from Sanity:', error);
    return {
      profile: null,
      featuredProjects: [],
      writings: [],
      testimonials: [],
      tools: [],
    };
  }
}
