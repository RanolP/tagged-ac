import {
  createContext,
  createSignal,
  JSX,
  ParentProps,
  Signal,
  useContext,
} from 'solid-js';

const TerminalHistoryContext = createContext<Signal<JSX.Element[]>>();

export const TerminalHistoryProvider = ({ children }: ParentProps) => {
  const historySignal = createSignal<JSX.Element[]>([]);
  return (
    <TerminalHistoryContext.Provider value={historySignal}>
      {children}
    </TerminalHistoryContext.Provider>
  );
};

export const useTerminalHistoryContext = () => {
  const value = useContext(TerminalHistoryContext);
  if (!value) {
    throw new Error(
      'useTerminalHistoryContext must be called inside TerminalHistoryContext',
    );
  }
  return value ?? [null, null];
};

export function useEcho() {
  const historySignal = useContext(TerminalHistoryContext);
  return (e: JSX.Element) => {
    if (!historySignal) return;
    const [, setHistories] = historySignal;
    setHistories((prev) => [...prev, e]);
  };
}
