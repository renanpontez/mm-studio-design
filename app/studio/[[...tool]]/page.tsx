"use client";

/**
 * Embedded Sanity Studio.
 * Route: /studio (catch-all for the Studio's internal routing).
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
