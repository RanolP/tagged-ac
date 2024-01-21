export interface PathSegment {
  type: 'static' | 'dynamic' | 'group';
  name: string;
}

export function parseSegment(s: string): PathSegment {
  if (s.at(0) === '(' && s.at(-1) === ')') {
    return { type: 'group', name: s.slice(1, -1) };
  }
  if (s.at(0) === ':') {
    return { type: 'dynamic', name: s.slice(1) };
  }
  if (s.at(0) === '[' && s.at(-1) === ']') {
    return { type: 'dynamic', name: s.slice(1, -1) };
  }
  return { type: 'static', name: s };
}
