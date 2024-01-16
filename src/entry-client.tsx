/* @refresh granular */
import 'virtual:uno.css';
import '@unocss/reset/tailwind.css';
import '~/styles/HEDunggeunmokkol.css';
import '~/styles/Silver.css';

import { mount, StartClient } from '@solidjs/start/client';

mount(() => <StartClient />, document.getElementById('app'));
