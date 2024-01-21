import { RouteDefinition } from '@solidjs/router';
import { Component } from 'solid-js';

export interface SolidStartRouteDefinition<
  S extends string | string[] = any,
  T = unknown,
> extends RouteDefinition<S, T> {
  type: 'api' | 'page';
  path: S;
  id?: string;
  matchSegments?: Array<string | null>;
  params?: Array<Param>;
  $component: {
    import: () => Promise<RouteModule>;
  };
}

export interface Param {
  type: ':';
  name: string;
  index: number;
}

export interface RouteModule {
  assets?: () => Promise<unknown[]>;
  default: Component;
}
