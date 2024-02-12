import { createMiddleware } from '@solidjs/start/middleware';

import { transformApiRoutes } from './features/appdir-routes';
import { createDatabase } from './server/database';

export default createMiddleware({
  onRequest: (event) => {
    transformApiRoutes();
    const db = createDatabase(event.nativeEvent);
    event.locals.db = db;
  },
});
