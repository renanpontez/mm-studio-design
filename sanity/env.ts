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
  // Soft guard: warn but never throw. Pages + client lazy-create and
  // gracefully fall back to the placeholder when projectId is empty.
  // Throwing here breaks Vercel preview builds + branch deploys that legitimately
  // run without Sanity secrets. Build-time enforcement happens in app/page.tsx
  // where we throw IF Sanity is configured but returns nothing.
  if (v === undefined || v === "") {
    if (process.env.NODE_ENV !== "production") console.warn(errorMessage);
    return "" as unknown as T;
  }
  return v;
}
