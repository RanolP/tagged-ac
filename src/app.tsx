// @refresh reload
import { RouteDefinition, Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start';
import { Suspense } from 'solid-js';

export default function App() {
  return (
    <Router root={(props) => <Suspense>{props.children}</Suspense>}>
      {((<FileRoutes />) as RouteDefinition[]).flatMap((x) =>
        (x as any).filePath?.endsWith('.page.tsx')
          ? [
              Object.assign(x, {
                path:
                  x.path === '/index.page'
                    ? '/'
                    : x.path.replace(/(\/index)?\.page$/, ''),
              }),
            ]
          : [],
      )}
    </Router>
  );
}
