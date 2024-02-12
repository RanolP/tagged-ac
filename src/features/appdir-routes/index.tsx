import { FileRoutes, reloadApiRoutes } from '@solidjs/start';
import { JSX } from 'solid-js';
import fileRoutes from 'vinxi/routes';

import { parseRouteTree, RootSegemnts, traverseRouteTree } from './route-tree';
import { SolidStartRouteDefinition } from './solid-start-route-definition';

export function AppdirRoutes(): JSX.Element {
  const definitionList = (
    <FileRoutes />
  ) as unknown as SolidStartRouteDefinition<string, unknown>[];

  const tree = parseRouteTree(definitionList);
  traverseRouteTree(definitionList, tree, RootSegemnts);

  return definitionList as unknown as JSX.Element;
}

export function transformApiRoutes() {
  const definitionList = (
    fileRoutes as unknown as SolidStartRouteDefinition<string, unknown>[]
  ).filter(containsHTTP);
  const tree = parseRouteTree(definitionList);
  traverseRouteTree(definitionList, tree, RootSegemnts);
  reloadApiRoutes();
}

function containsHTTP(route: unknown) {
  return (
    route &&
    typeof route === 'object' &&
    ['$GET', '$POST', '$PUT', '$PATCH', '$DELETE'].some(
      (key) => key in route && (route as any)[key],
    )
  );
}
