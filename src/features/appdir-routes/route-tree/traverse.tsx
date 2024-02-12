import { RouteSectionProps } from '@solidjs/router';
import { Component, lazy, ParentProps, splitProps } from 'solid-js';

import { Param } from '../solid-start-route-definition';
import { RouteTreeNode } from './types';

export function traverseRouteTree(node: RouteTreeNode) {
  for (const child of Object.values(node.children)) {
    traverseRouteTree(child);
  }

  if (node.value['not-found']) {
    if (node.parent)
      deleteItem(node.originalDefinitionList, node.value['not-found']);
    /** @todo */
    console.error('TODO: Implement /not-found.js');
    deleteItem(node.originalDefinitionList, node.value['not-found']);
  }

  if (node.value.route) {
    const { matchSegments, params } = resolveParent(node);
    node.value.route.matchSegments = matchSegments;
    node.value.route.params = params;
  } else if (node.value.page) {
    /** @todo: support error, loading, recursive layout */
    const { error: _0, loading: _1, page } = node.value;
    const { ParentLayoutComponent, path } = resolveParent(node);

    page.path = path;
    const PageComponent = page.component;
    if (PageComponent)
      page.component = lazy(async () => {
        return {
          default: (props: RouteSectionProps) => {
            let content = <PageComponent {...props} />;
            if (ParentLayoutComponent)
              content = (
                <ParentLayoutComponent {...props}>
                  {content}
                </ParentLayoutComponent>
              );
            return content;
          },
        };
      });

    deleteItem(node.originalDefinitionList, node.value.route);
  }

  deleteItem(node.originalDefinitionList, node.value.error);
  deleteItem(node.originalDefinitionList, node.value.loading);
  deleteItem(node.originalDefinitionList, node.value.layout);
  deleteItem(node.originalDefinitionList, node.value['not-found']);
}

function resolveParent(node: RouteTreeNode) {
  const layouts: Array<Component<RouteSectionProps>> = [];
  let path = '';
  const matchSegments: Array<string | null> = [];
  const params: Array<Param> = [];

  let current: RouteTreeNode | undefined = node;
  let n = 0;
  while (current) {
    if (current.parent)
      switch (current.segment.type) {
        case 'static':
          n++;
          matchSegments.splice(0, 0, current.segment.name);
          path = `/${current.segment.name}${path}`;
          break;
        case 'dynamic':
          n++;
          matchSegments.splice(0, 0, null);
          path = `/:${current.segment.name}${path}`;
          params.push({
            type: ':',
            name: current.segment.name,
            index: -n,
          });
          break;
        case 'group':
          break;
      }

    if (current.value.layout?.component)
      layouts.push(current.value.layout.component);

    current = current.parent;
  }
  for (const param of params) {
    param.index += n;
  }
  if (path === '') path = '/';

  const ParentLayoutComponent =
    layouts.length > 0
      ? (_props: ParentProps<RouteSectionProps>) => {
          const [local, others] = splitProps(_props, ['children']);
          let content = local.children;
          for (const Layout of layouts) {
            content = <Layout {...others}>{content}</Layout>;
          }
          return content;
        }
      : null;

  return { ParentLayoutComponent, path, matchSegments, params };
}

function deleteItem<T>(array: T[], value: T) {
  const index = array.indexOf(value);
  if (index === -1) return;
  array.splice(index, 1);
}
