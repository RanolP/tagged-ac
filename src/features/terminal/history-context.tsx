import {
  createContext,
  createSignal,
  JSX,
  ParentProps,
  Signal,
  useContext,
} from 'solid-js';

const TerminalHistoryContext = createContext<Signal<JSX.Element[]>>();

export function TerminalHistoryProvider(props: ParentProps) {
  const value = createSignal<JSX.Element[]>([]);
  return (
    <TerminalHistoryContext.Provider value={value}>
      {props.children}
    </TerminalHistoryContext.Provider>
  );
}

export function useTerminalHistory() {
  const value = useContext(TerminalHistoryContext);
  if (!value) {
    throw new Error('Client must have terminal history');
  }
  return value;
}
