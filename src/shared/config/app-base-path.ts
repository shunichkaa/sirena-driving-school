export const appBasePath = process.env.NODE_ENV === "production" ? "/sirena-driving-school" : "";

export function assetUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${appBasePath}${normalized}`;
}
