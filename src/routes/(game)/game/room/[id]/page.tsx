import { RouteSectionProps } from '@solidjs/router';

export default function RoomPage(props: RouteSectionProps) {
  return <div>Room {props.params.id} from page</div>;
}
