import { RouteSectionProps } from '@solidjs/router';
import { ParentProps } from 'solid-js';

import { StatusBar } from '~/features/status-bar';

export default function Layout({ children }: RouteSectionProps) {
  return (
    <>
      <StatusBar />
      {children}
    </>
  );
}
