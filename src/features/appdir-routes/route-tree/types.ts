import { LeafRoute } from '../leaf-route';
import { PathSegment } from '../path-segment';
import { SolidStartRouteDefinition } from '../solid-start-route-definition';

export interface RouteTreeNode {
  originalDefinitionList: SolidStartRouteDefinition[];
  parent?: RouteTreeNode;
  segment: PathSegment;
  value: Partial<Record<LeafRoute, SolidStartRouteDefinition>>;
  children: Record<string, RouteTreeNode>;
}
