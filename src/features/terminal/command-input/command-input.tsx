import { createMemo, createSignal, JSX } from 'solid-js';

import { Icon } from '~/design-system/icon/icon';

import { AutoCompletion, Suggestion } from './auto-completion';

interface Props {
  suggestions: Suggestion[];
}

export function CommandInput(props: Props) {
  const [value, setValue] = createSignal('');
  const onInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
    setValue(e.currentTarget.value);
  };

  const suggestionsFiltered = createMemo(() => {
    const command = value().split(' ');
    return props.suggestions.filter((s) => s.value.startsWith(command[0]));
  });

  return (
    <div flex="~ col" relative w-full text-8>
      <div flex="~ row" h-14 w-full items-center p-2>
        <Icon name="command-box" mr-2 />
        <input
          h="[1em]"
          flex-1
          border-none
          bg-transparent
          outline-none
          onInput={onInput}
          value={value()}
        />
      </div>
      <AutoCompletion absolute top-16 suggestions={suggestionsFiltered()} />
    </div>
  );
}
