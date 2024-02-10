interface EventYielder<Event> {
  stream: AsyncGenerator<Event>;
  listener: (event: Event) => void;
  done: () => void;
}

export function createEventYielder<Event>(): EventYielder<Event> {
  const queue = {
    current: Promise.withResolvers<
      { type: 'yield'; event: Event } | { type: 'done' }
    >(),
  };

  return {
    stream: (async function* () {
      while (true) {
        const command = await queue.current.promise;
        switch (command.type) {
          case 'yield': {
            yield command.event;
            break;
          }
          case 'done': {
            return;
          }
        }
        queue.current = Promise.withResolvers();
      }
    })(),
    listener: (event) => {
      queue.current.resolve({ type: 'yield', event });
    },
    done: () => {
      queue.current.resolve({ type: 'done' });
    },
  };
}
