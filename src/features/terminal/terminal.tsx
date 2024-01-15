import { createSignal, JSX } from 'solid-js';

interface Props {
  initialPrompt?: JSX.Element[];
  input: JSX.Element;
}

export function Terminal({ initialPrompt, input }: Props) {
  const [histories, _setHistories] = createSignal(initialPrompt);
  return (
    <div mx-auto mt-4 max-w-full w-7xl bg-black color-white>
      <div flex="~ col" p-4>
        {histories()}
      </div>
      {input}
    </div>
  );
}