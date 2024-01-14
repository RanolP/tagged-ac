import { RouteDefinition } from '@solidjs/router';
import { Component } from 'solid-js';

export interface SolidStartRouteDefinition<
  S extends string | string[] = any,
  T = unknown,
> extends RouteDefinition<S, T> {
  type: 'api' | 'page';
  id: string;
  $component: {
    import: () => Promise<RouteModule>;
  };
}

export interface RouteModule {
  assets?: () => Promise<unknown[]>;
  default: Component;
}
