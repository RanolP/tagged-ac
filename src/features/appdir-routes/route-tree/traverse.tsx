import {
  Param,
  SolidStartRouteDefinition,
} from '../solid-start-route-definition';
import { RouteTreeNode } from './types';

export function traverseRouteTree(
  originalDefinitionList: SolidStartRouteDefinition[],
  node: RouteTreeNode,
  segments: Segments,
): SolidStartRouteDefinition[] {
  const resultingDefinition: SolidStartRouteDefinition[] = [];

  if (node.value['not-found']) {
    if (node.hasParent)
      deleteItem(originalDefinitionList, node.value['not-found']);
    /** @todo */
    console.error('TODO: Implement /not-found.js');
    deleteItem(originalDefinitionList, node.value['not-found']);
  }

  if (node.value.layout) {
    const layoutSegments = appendSegment(segments, node);
    const children = Object.values(node.children).flatMap((child) =>
      traverseRouteTree(originalDefinitionList, child, layoutSegments),
    );
    node.value.layout.path = layoutSegments.page.path;
    node.value.layout.children = children;
  }

  if (node.value.route) {
    const { matchSegments, params } = appendSegment(segments, node).route;
    node.value.route.matchSegments = matchSegments;
    node.value.route.params = params;
    console.log({ matchSegments, params });

    const parentSegments = appendSegment(segments, node);
    for (const child of Object.values(node.children)) {
      resultingDefinition.push(
        ...traverseRouteTree(originalDefinitionList, child, parentSegments),
      );
    }
  } else if (node.value.page) {
    /** @todo: support error, loading, recursive layout */
    const { error: _0, loading: _1 } = node.value;

    const { page } = appendSegment(segments, node);
    node.value.page.path = page.path;

    deleteItem(originalDefinitionList, node.value.route);

    if (page.hasParentLayout) {
      deleteItem(originalDefinitionList, node.value.page);
      if (node.value.layout)
        node.value.layout.children = [
          ...[node.value.layout.children ?? []].flat(),
          node.value.page,
        ];
      else resultingDefinition.push(node.value.page);
    }
  } else {
    const parentSegments = appendSegment(segments, node);
    for (const child of Object.values(node.children)) {
      resultingDefinition.push(
        ...traverseRouteTree(originalDefinitionList, child, parentSegments),
      );
    }
  }

  deleteItem(originalDefinitionList, node.value.error);
  deleteItem(originalDefinitionList, node.value.loading);
  deleteItem(originalDefinitionList, node.value['not-found']);

  return resultingDefinition;
}

interface Segments {
  route: { matchSegments: Array<string | null>; params: Param[] };
  page: { path: string; hasParentLayout: boolean };
}

export const RootSegemnts: Segments = {
  route: {
    matchSegments: [],
    params: [],
  },
  page: {
    path: '',
    hasParentLayout: false,
  },
};

function appendSegment(segments: Segments, node: RouteTreeNode): Segments {
  let {
    route: { matchSegments, params },
    page: { path, hasParentLayout },
  } = segments;
  if (node.value.layout) {
    path = '';
    hasParentLayout = true;
  }

  if (path.at(-1) === '/') path = path.slice(0, -1);

  switch (node.segment.type) {
    case 'static':
      return {
        route: {
          matchSegments: node.isRoot
            ? matchSegments
            : [...matchSegments, node.segment.name],
          params,
        },
        page: {
          path: node.isRoot ? path : `${path}/${node.segment.name}`,
          hasParentLayout,
        },
      };
    case 'dynamic':
      return {
        route: {
          matchSegments: [...matchSegments, null],
          params: [
            ...params,
            { type: ':', name: node.segment.name, index: matchSegments.length },
          ],
        },
        page: {
          path: `${path}/:${node.segment.name}`,
          hasParentLayout,
        },
      };
    case 'group':
      return {
        route: { matchSegments, params },
        page: { path, hasParentLayout },
      };
  }
}

function deleteItem<T>(array: T[], value: T) {
  const index = array.indexOf(value);
  if (index === -1) return;
  array.splice(index, 1);
}
