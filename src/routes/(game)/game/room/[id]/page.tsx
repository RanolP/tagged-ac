import { RouteSectionProps } from '@solidjs/router';

export default function RoomPage({ params }: RouteSectionProps) {
  return <div>Room {params.id} from page</div>;
}
