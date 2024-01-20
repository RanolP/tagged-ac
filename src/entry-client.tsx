/* @refresh granular */
import 'virtual:uno.css';
import '@unocss/reset/tailwind.css';

import { mount, StartClient } from '@solidjs/start/client';

mount(() => <StartClient />, document.getElementById('app'));
