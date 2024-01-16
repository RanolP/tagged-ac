import { RouteSectionProps } from '@solidjs/router';

import { StatusBar } from '~/features/status-bar';

export default function Layout({ children }: RouteSectionProps) {
  return (
    <div lh-normal font-mono>
      <StatusBar />
      {children}
    </div>
  );
}
