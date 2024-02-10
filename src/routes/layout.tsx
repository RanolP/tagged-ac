import { RouteSectionProps } from '@solidjs/router';

import { StatusBar } from '~/features/status-bar';

// import { TerminalHistoryProvider } from '~/features/terminal';
import { Background } from './_components/background';

export default function Layout(props: RouteSectionProps) {
  return (
    // <TerminalHistoryProvider>
    <div lh-normal font-mono>
      <Background />
      <div relative z-1>
        <StatusBar />
        {props.children}
      </div>
    </div>
    // </TerminalHistoryProvider>
  );
}
