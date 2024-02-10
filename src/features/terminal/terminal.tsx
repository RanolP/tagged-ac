import { createRenderEffect, createSignal, JSX } from 'solid-js';

interface Props {
  initialPrompt?: JSX.Element[];
  input: JSX.Element;
}

const [histories, setHistories] = createSignal<JSX.Element[]>([]);

export function useEcho() {
  return (e: JSX.Element) => {
    setHistories((prev) => [...prev, e]);
  };
}

export function Terminal(props: Props) {
  createRenderEffect(() => {
    setHistories((prev) =>
      prev.length === 0 ? props.initialPrompt ?? [] : prev,
    );
  });

  return (
    <div
      bg="#222"
      mx-auto
      mt-4
      max-w-full
      w-7xl
      bg-opacity-40
      text-8
      color-white
      backdrop-blur-lg
    >
      <div flex="~ col" p-4>
        {histories?.()}
      </div>
      {props.input}
    </div>
  );
}
