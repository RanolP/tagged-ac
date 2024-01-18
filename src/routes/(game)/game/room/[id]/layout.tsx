import { RouteSectionProps } from '@solidjs/router';
import { ParentProps } from 'solid-js';

export default function RoomLayout(props: ParentProps<RouteSectionProps>) {
  return (
    <div>
      <div>Room ID : {props.params.id} from layout</div>
      {props.children}
    </div>
  );
}
