import { apiRoutes, FileRoutes } from '@solidjs/start';
import { JSX } from 'solid-js';

import { parseRouteTree, traverseRouteTree } from './route-tree';
import { SolidStartRouteDefinition } from './solid-start-route-definition';

export function AppdirRoutes(): JSX.Element {
  const definitionList = (
    <FileRoutes />
  ) as unknown as SolidStartRouteDefinition<string, unknown>[];

  const tree = parseRouteTree(definitionList);
  traverseRouteTree(tree);

  return definitionList as unknown as JSX.Element;
}

export function transformApiRoutes() {
  const tree = parseRouteTree(
    apiRoutes as unknown as SolidStartRouteDefinition<string, unknown>[],
  );
  traverseRouteTree(tree);
}
