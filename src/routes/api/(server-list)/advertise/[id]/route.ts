import { APIEvent } from '@solidjs/start/server/types';

export function GET({ params }: APIEvent) {
  console.log({ params });
  return { message: 'hello, world!' };
}
