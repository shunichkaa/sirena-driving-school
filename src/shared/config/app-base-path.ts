export const appBasePath = process.env.NODE_ENV === "production" ? "/sirena-driving-school" : "";

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
