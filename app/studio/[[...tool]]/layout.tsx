// Studio renders its own UI; opt out of the marketing site's Header/Footer.
export const metadata = { robots: "noindex,nofollow" };

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
