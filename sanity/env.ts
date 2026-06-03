export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

export const studioUrl = "/studio";

export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET;
// Prefer a dedicated read token; fall back to write token (server-only).
// Server components never expose this to the browser bundle.
export const readToken =
  process.env.SANITY_READ_TOKEN || process.env.SANITY_WRITE_TOKEN;

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  // In production the absence of these vars is a deploy bug — fail loudly so
  // Vercel surfaces it during build instead of silently shipping the
  // "publish in Studio" placeholder. In dev we warn so initial setup works.
  if (v === undefined || v === "") {
    if (process.env.NODE_ENV === "production") {
      // Skip throwing during `next build` for environments where the build
      // script intentionally runs without secrets (e.g. type-check only).
      if (process.env.SANITY_ALLOW_MISSING_ENV === "1") {
        return "" as unknown as T;
      }
      throw new Error(errorMessage);
    }
    console.warn(errorMessage);
    return "" as unknown as T;
  }
  return v;
}
