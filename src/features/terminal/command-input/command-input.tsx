import { flip, offset } from '@floating-ui/dom';
import { createAsync, useNavigate } from '@solidjs/router';
import { useFloating } from 'solid-floating-ui';
import { createEffect, createMemo, createSignal, JSX } from 'solid-js';

import { Icon } from '~/design-system/icon';
import {
  CommandError,
  StructuredCommand,
} from '~/features/command/structured-command';

import { useEcho } from '..';
import { AutoCompletion, Suggestion } from './auto-completion';
import { animateFailShake } from './utils/animate-fail-shake';

interface Props {
  commands: StructuredCommand[];
}

export function CommandInput(props: Props) {
  const [value, setValue] = createSignal('');
  const onInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
    setValue(e.currentTarget.value);
  };

  const commandInput = createMemo(() => value().split(/ +/));
  const commandsMatched = createMemo(() => {
    const input = commandInput();
    let commands = props.commands;

    for (let i = 0; i < input.length; i++) {
      const groupedCommands: Record<string, StructuredCommand[]> = {};
      const filtered = [];
      for (const command of commands) {
        if (
          command.name.length > i &&
          !(i === input.length - 1
            ? command.name[i].startsWith(input[i])
            : command.name[i] === input[i])
        )
          continue;

        filtered.push(command);
        const groupKey = command.name.slice(0, i).join(' ');
        if (groupKey in groupedCommands) {
          groupedCommands[groupKey].push(command);
        } else {
          groupedCommands[groupKey] = [command];
        }
      }
      if (input[i].length > 0) {
        for (const group of Object.values(groupedCommands)) {
          const max = group.reduce((l, r) =>
            l.name.length > r.name.length ? l : r,
          );
          for (const command of group) {
            if (command.name.length < Math.min(input.length, max.name.length)) {
              filtered.splice(filtered.indexOf(command), 1);
            }
          }
        }
      }

      commands = filtered;
    }

    return commands;
  });

  // do not createResource due to https://github.com/solidjs/solid/issues/2047
  const [suggestionsFiltered, setSuggestionsFiltered] = createSignal<
    Suggestion[]
  >([]);
  createEffect(() => {
    const input = commandInput();

    Promise.all(
      commandsMatched().map((command) =>
        command.suggest(input.slice(command.name.length)),
      ),
    ).then((x) => setSuggestionsFiltered(x.flat()));
  });

  const echo = useEcho();
  const navigate = useNavigate();

  const [isExecuting, setExecuting] = createSignal(false);
  const executeCommand: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
    event,
  ) => {
    event.preventDefault();
    if (isExecuting()) return;
    try {
      setExecuting(true);
      const commandBestMatch = commandsMatched().at(0);
      if (!commandBestMatch) {
        await animateFailShake(event.currentTarget);
        return;
      }

      const args = commandInput().slice(commandBestMatch?.name.length);
      const errors: CommandError[] = [];
      await commandBestMatch.execute(
        {
          errors,
          echo,
          navigate,
        },
        args,
      );
      setValue('');
    } finally {
      setExecuting(false);
    }
  };
  createAsync;

  const [reference, setReference] = createSignal<HTMLDivElement>();
  const [floating, setFloating] = createSignal<HTMLDivElement>();
  const position = useFloating(reference, floating, {
    strategy: 'absolute',
    placement: 'bottom-end',
    middleware: [offset(16), flip()],
  });

  return (
    <div flex="~ col" relative w-full text-8>
      <form
        ref={setReference}
        flex="~ row"
        h-14
        w-full
        items-center
        px-2
        onSubmit={executeCommand}
      >
        <Icon name="command-prompt-box" my-2 mr-2 />
        <input
          h="[2em]"
          onInput={onInput}
          value={value()}
          flex-1
          border-none
          bg-transparent
          py-2
          outline-none
        />
      </form>
      <AutoCompletion
        ref={setFloating}
        suggestions={suggestionsFiltered()}
        flex={position.placement === 'bottom-end' ? 'col' : 'col-reverse'}
        style={{
          position: position.strategy,
          left: `${position.x ?? 0}px`,
          top: `${position.y ?? 0}px`,
        }}
      />
    </div>
  );
}
