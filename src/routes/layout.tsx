import { RouteSectionProps } from '@solidjs/router';

import { StatusBar } from '~/features/status-bar';

export default function Layout({ children }: RouteSectionProps) {
  return (
    <div lh="[1]" font-mono>
      <StatusBar />
      {children}
    </div>
  );
}
