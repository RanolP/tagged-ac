const LeafRoute = [
  'layout',
  'error',
  'page',
  'loading',
  'not-found',
  'route',
] as const;
export type LeafRoute = (typeof LeafRoute)[number];

export function isLeafRoute(x: unknown): x is LeafRoute {
  return (LeafRoute as readonly unknown[]).includes(x);
}
