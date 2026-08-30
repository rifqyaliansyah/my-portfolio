import { client } from "./lib/sanity";
import { LANDING_PAGE_QUERY } from "./lib/sanity.queries";
import { LandingPageData } from "./types/sanity";
import ClientHomeLayout from "./components/ClientHomeLayout";

export const revalidate = 60;

export default async function Home() {
  let data: LandingPageData | null = null;

  try {
    data = await client.fetch<LandingPageData>(LANDING_PAGE_QUERY);
  } catch (err) {
    console.error("Failed to fetch Sanity data on server:", err);
  }

  return <ClientHomeLayout data={data} />;
}