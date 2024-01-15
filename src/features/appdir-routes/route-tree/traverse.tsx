import { RouteSectionProps } from '@solidjs/router';
import { Component, lazy, ParentProps } from 'solid-js';

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
    node.value.route.type = 'api';
    deleteItem(node.originalDefinitionList, node.value.page);
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

  let current: RouteTreeNode | undefined = node;
  while (current) {
    if (current.parent)
      switch (current.segment.type) {
        case 'static':
          path = `/${current.segment.name}${path}`;
          break;
        case 'dynamic':
          path = `/:${current.segment.name}${path}`;
          break;
        case 'group':
          break;
      }

    if (current.value.layout?.component)
      layouts.push(current.value.layout.component);

    current = current.parent;
  }
  if (path === '') path = '/';

  const ParentLayoutComponent =
    layouts.length > 0
      ? ({ children, ...props }: ParentProps<RouteSectionProps>) => {
          let content = children;
          for (const Layout of layouts) {
            content = <Layout {...props}>{content}</Layout>;
          }
          return content;
        }
      : null;

  return { ParentLayoutComponent, path };
}

function deleteItem<T>(array: T[], value: T) {
  const index = array.indexOf(value);
  if (index === -1) return;
  array.splice(index, 1);
}
