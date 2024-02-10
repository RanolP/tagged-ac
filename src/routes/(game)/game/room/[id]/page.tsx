import { RouteSectionProps } from '@solidjs/router';
import dayjs from 'dayjs';
import { createEffect } from 'solid-js';

import { myPeerId } from '~/features/game/communication/peer';
import { CommandInput, Terminal } from '~/features/terminal';
import { requestAdvertise } from '~/routes/api/(server-list)/advertise/[id]/route';

export default function RoomPage(props: RouteSectionProps) {
  createEffect(() => {
    const shouldAdvertise = myPeerId() === props.params.id;
    if (!shouldAdvertise) return;

    const refresh = () => {
      const peerId = myPeerId();
      if (!peerId) return;
      requestAdvertise({ id: peerId }).then((res) => {
        if (!res.ok) return;
        const validDuration = dayjs(res.value.validUntil).diff(
          null,
          'milliseconds',
        );
        timeoutRef.current = setTimeout(
          refresh,
          Math.max(0, validDuration - 300),
        );
      });
    };

    const timeoutRef = { current: setTimeout(refresh, 0) };

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  });
  return (
    <>
      <Terminal input={<CommandInput commands={[]} />} />
    </>
  );
}
