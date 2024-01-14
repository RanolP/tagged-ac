// @refresh reload
import '~/styles/Silver.css';

import { Router } from '@solidjs/router';
import { Suspense } from 'solid-js';

import { AppdirRoutes } from '~/features/appdir-routes';

export default function App() {
  return (
    <Router root={(props) => <Suspense>{props.children}</Suspense>}>
      <AppdirRoutes />
    </Router>
  );
}
