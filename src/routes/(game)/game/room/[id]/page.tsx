import { RouteSectionProps, useNavigate } from '@solidjs/router';
import dayjs from 'dayjs';
import { createEffect, createMemo } from 'solid-js';

import { usePeerInstance } from '~/features/game/communication/peer';
import { CommandInput, Terminal, useEcho } from '~/features/terminal';
import { requestAdvertise } from '~/routes/api/(server-list)/advertise/[id]/route';

export default function RoomPage(props: RouteSectionProps) {
  const peer = usePeerInstance();
  const isHost = createMemo(() => peer.myId() === props.params.id);
  createEffect(() => {
    if (!isHost()) return;

    const refresh = () => {
      const peerId = peer.myId();
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

  const navigate = useNavigate();
  createEffect(() => {
    if (isHost()) return;

    peer.join(props.params.id).catch(() => navigate('/'));
  });

  const echo = useEcho();
  createEffect(() => {
    if (!isHost()) return;
    const { stream, stopHosting } = peer.startHost();
    (async () => {
      for await (const _conn of stream) {
        echo(<p>새로운 커넥션 접근 확인!</p>);
      }
    })();

    return () => stopHosting();
  });

  return (
    <>
      <Terminal input={<CommandInput commands={[]} />} />
    </>
  );
}
