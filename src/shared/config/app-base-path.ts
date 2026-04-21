const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const appBasePath = rawBasePath ? `/${rawBasePath.replace(/^\/+|\/+$/g, "")}` : "";

export function assetUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${appBasePath}${normalized}`;
}

export function homeFragmentHref(fragment: string): string {
  const id = fragment.startsWith("#") ? fragment.slice(1) : fragment;
  return `${appBasePath}/#${id}`.replace(/^\/\//, "/");
}

export function fragmentIdFromHref(href: string): string {
  const i = href.lastIndexOf("#");
  return i >= 0 ? href.slice(i + 1) : href;
}
