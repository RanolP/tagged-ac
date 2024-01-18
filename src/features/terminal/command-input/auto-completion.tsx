import { JSX, splitProps } from 'solid-js';

export interface Suggestion {
  value: string;
  display:
    | {
        title: string;
        description?: string;
      }
    | JSX.Element;
}

interface Props extends JSX.HTMLAttributes<HTMLDivElement> {
  suggestions: Suggestion[];
}

export function AutoCompletion(props: Props) {
  const [local, others] = splitProps(props, ['suggestions']);
  return (
    <div
      flex="~ col"
      bg="#000 opacity-50"
      w="[calc(100%_-_3rem)]"
      backdrop-blur-lg
      {...others}
    >
      {local.suggestions.map(({ display }) =>
        display != null && typeof display === 'object' && 'title' in display ? (
          <div grid="~ areas-[auto_auto]" w-full px-4 py-2>
            <span>{display.title}</span>
            <span justify-self-end>{display.description}</span>
          </div>
        ) : (
          display
        ),
      )}
    </div>
  );
}
