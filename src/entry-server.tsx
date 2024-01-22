import { createHandler } from '@solidjs/start/entry';
import { StartServer } from '@solidjs/start/server';

import { transformApiRoutes } from '~/features/appdir-routes';
import { createDatabase } from '~/server/database';

export default createHandler(
  () => (
    <StartServer
      document={({ assets, children, scripts }) => (
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.svg" />
            <link rel="stylesheet" href="/fonts/HEDunggeunmokkol.css" />
            <link rel="stylesheet" href="/fonts/Silver.css" />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      )}
    />
  ),
  {
    onRequest(e) {
      transformApiRoutes();
      const [db, migrate] = createDatabase(e);
      migrate();

      e.context.db = db;
    },
  },
);
