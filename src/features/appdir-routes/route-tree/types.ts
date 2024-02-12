import { LeafRoute } from '../leaf-route';
import { PathSegment } from '../path-segment';
import { SolidStartRouteDefinition } from '../solid-start-route-definition';

export interface RouteTreeNode {
  isRoot?: true;
  hasParent: boolean;
  segment: PathSegment;
  value: Partial<Record<LeafRoute, SolidStartRouteDefinition>>;
  children: Record<string, RouteTreeNode>;
}
