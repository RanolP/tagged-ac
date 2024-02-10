'use client';

import { createRenderEffect, JSX } from 'solid-js';

import { useTerminalHistoryContext } from './history-context';

interface Props {
  initialPrompt?: JSX.Element[];
  input: JSX.Element;
}

export function Terminal(props: Props) {
  const [histories, setHistories] = useTerminalHistoryContext();
  createRenderEffect(() => {
    setHistories?.((prev) =>
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
