import { isLeafRoute } from '../leaf-route';
import { parseSegment } from '../path-segment';
import { SolidStartRouteDefinition } from '../solid-start-route-definition';
import { RouteTreeNode } from './types';

export function parseRouteTree(
  definitionList: SolidStartRouteDefinition[],
): RouteTreeNode {
  const root: RouteTreeNode = {
    isRoot: true,
    hasParent: false,
    segment: { type: 'static', name: '' },
    value: {},
    children: {},
  };

  let cursor = 0;
  while (cursor < definitionList.length) {
    const rawSegmentList: string[] = (
      definitionList[cursor].id ?? `${definitionList[cursor].path}`
    ).split('/');
    const lastSegment = rawSegmentList.at(-1);
    if (!isLeafRoute(lastSegment)) {
      definitionList.splice(cursor, 1);
      continue;
    }
    let targetNode = root;
    // the first one must be '', the last one should be treated differently
    for (const rawSegment of rawSegmentList.slice(1, -1)) {
      const segment = parseSegment(rawSegment);
      if (rawSegment in targetNode.children) {
        targetNode = targetNode.children[rawSegment];
      } else {
        const newChild: RouteTreeNode = {
          hasParent: targetNode !== root,
          segment,
          value: {},
          children: {},
        };
        targetNode.children[rawSegment] = newChild;
        targetNode = newChild;
      }
    }
    targetNode.value[lastSegment] = definitionList[cursor];
    cursor += 1;
  }

  return root;
}
