import { RouteSectionProps } from '@solidjs/router';

import { StatusBar } from '~/features/status-bar';

import { Background } from './_components/background';

export default function Layout({ children }: RouteSectionProps) {
  return (
    <div lh-normal font-mono>
      <Background />
      <div relative z-1>
        <StatusBar />
        {children}
      </div>
    </div>
  );
}
