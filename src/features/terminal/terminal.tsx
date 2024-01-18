import { createSignal, JSX } from 'solid-js';

interface Props {
  initialPrompt?: JSX.Element[];
  input: JSX.Element;
}

export function Terminal(props: Props) {
  const [histories, _setHistories] = createSignal(props.initialPrompt);
  return (
    <div
      mx-auto
      mt-4
      max-w-full
      w-7xl
      bg="#222"
      bg-opacity-40
      color-white
      backdrop-blur-lg
    >
      <div flex="~ col" p-4>
        {histories()}
      </div>
      {props.input}
    </div>
  );
}
