import { Params, RouteSectionProps } from '@solidjs/router';
import { ParentProps } from 'solid-js';

export default function RoomLayout({
  params,
  children,
}: ParentProps<RouteSectionProps>) {
  return (
    <div>
      <div>Room ID : {params.id} from layout</div>
      {children}
    </div>
  );
}
