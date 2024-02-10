import { RouteSectionProps } from '@solidjs/router';
import { ParentProps } from 'solid-js';

export default function RoomLayout(props: ParentProps<RouteSectionProps>) {
  return props.children;
}
