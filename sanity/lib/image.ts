import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "../env";

let _builder: ReturnType<typeof createImageUrlBuilder> | null = null;

function getBuilder() {
  if (_builder) return _builder;
  if (!projectId || !dataset) return null;
  _builder = createImageUrlBuilder({ projectId, dataset });
  return _builder;
}

export function urlFor(source: Image) {
  const b = getBuilder();
  if (!b) {
    // Return a stub that satisfies the typical chain so callers don't crash.
    return {
      width: () => ({ url: () => "" }),
      url: () => "",
    } as unknown as ReturnType<NonNullable<ReturnType<typeof getBuilder>>["image"]>;
  }
  return b.image(source).auto("format").fit("max");
}
