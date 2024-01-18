import { flip, offset } from '@floating-ui/dom';
import { useFloating } from 'solid-floating-ui';
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

  const [reference, setReference] = createSignal<HTMLDivElement>();
  const [floating, setFloating] = createSignal<HTMLDivElement>();
  const position = useFloating(reference, floating, {
    strategy: 'absolute',
    placement: 'bottom-end',
    middleware: [offset(16), flip()],
  });

  return (
    <div flex="~ col" relative w-full text-8>
      <div ref={setReference} flex="~ row" h-14 w-full items-center p-2>
        <Icon name="command-prompt-box" mr-2 />
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
