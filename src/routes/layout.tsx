import { RouteSectionProps } from '@solidjs/router';

import { PeerProvider } from '~/features/game/communication/peer';
import { StatusBar } from '~/features/status-bar';
import { TerminalHistoryProvider } from '~/features/terminal/history-context';

import { Background } from './_components/background';

export default function Layout(props: RouteSectionProps) {
  return (
    <TerminalHistoryProvider>
      <PeerProvider>
        <div lh-normal font-mono>
          <Background />
          <div relative z-1>
            <StatusBar />
            {props.children}
          </div>
        </div>
      </PeerProvider>
    </TerminalHistoryProvider>
  );
}
