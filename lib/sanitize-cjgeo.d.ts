// Type declarations for the .mjs sanitizer module.
export type AnchorMapEntry = { id: string; keywords: string[] };
export type AnchorMap = AnchorMapEntry[];
export type SatelliteLink = { href: string; title: string };
export type SanitizeOptions = {
  anchorMap?: AnchorMap;
  satelliteLinks?: Record<string, SatelliteLink[]>;
  strictAnchors?: boolean;
};
export type SanitizeResult = {
  html: string;
  headings: { id: string; text: string }[];
  wordCount: number;
};
export function sanitizeCJGEO(rawHtml: string, options?: SanitizeOptions): SanitizeResult;
export function injectH2Ids(
  html: string,
  anchorMap?: AnchorMap
): {
  html: string;
  headings: { id: string; text: string }[];
  ok: boolean;
  reason?: string;
};
export function injectSatelliteLinks(
  html: string,
  links: Record<string, SatelliteLink[]>
): string;
declare const _default: typeof sanitizeCJGEO;
export default _default;
