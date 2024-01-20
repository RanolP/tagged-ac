import { flip, offset } from '@floating-ui/dom';
import { useFloating } from 'solid-floating-ui';
import { createMemo, createSignal, JSX } from 'solid-js';

import { Icon } from '~/design-system/icon/icon';
import { StructuredCommand } from '~/features/command/structured-command';

import { AutoCompletion } from './auto-completion';

interface Props {
  commands: StructuredCommand[];
}

export function CommandInput(props: Props) {
  const [value, setValue] = createSignal('');
  const onInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
    setValue(e.currentTarget.value);
  };

  const suggestionsFiltered = createMemo(() => {
    const input = value().trim().split(/ +/);
    let commands = props.commands;

    for (let i = 0; i < input.length; i++) {
      const groupedCommands: Record<string, StructuredCommand[]> = {};
      const filtered = [];
      for (const command of commands) {
        if (command.name.length > i && !command.name[i].startsWith(input[i]))
          continue;

        filtered.push(command);
        const groupKey = command.name.slice(0, i).join(' ');
        if (groupKey in groupedCommands) {
          groupedCommands[groupKey].push(command);
        } else {
          groupedCommands[groupKey] = [command];
        }
      }
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

      commands = filtered;
    }
    return commands.flatMap((command) =>
      command.suggest(input.slice(command.name.length)),
    );
  });

  const [reference, setReference] = createSignal<HTMLDivElement>();
  const [floating, setFloating] = createSignal<HTMLDivElement>();
  const position = useFloating(reference, floating, {
    strategy: 'absolute',
    placement: 'bottom-end',
    middleware: [offset(16), flip()],
  });

  return (
    <div flex="~ col" relative w-full text-8>
      <div ref={setReference} flex="~ row" h-14 w-full items-center px-2>
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
      </div>
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
