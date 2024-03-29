import { For, JSX, splitProps } from 'solid-js';

import { Icon, IconName } from '~/design-system/icon';

export interface Suggestion {
  value: string;
  icon?: IconName;
  description?: string;
}

interface Props extends JSX.HTMLAttributes<HTMLDivElement> {
  suggestions: Suggestion[];
}

export function AutoCompletion(props: Props) {
  const [local, others] = splitProps(props, ['suggestions']);
  return (
    <div
      class={'[[data-state="inactive"]_&]:pointer-events-none'}
      flex="~ col"
      bg="#000 opacity-50"
      w="[calc(100%_-_3rem)]"
      text-6
      backdrop-blur-lg
      {...others}
    >
      <For each={local.suggestions}>
        {({ value, icon, description }) => (
          <div grid="~ areas-[auto_auto]" w-full px-2 py-2>
            <span flex="~ row">
              <Icon name={icon ?? 'null'} mr-1 />
              <span>{value}</span>
            </span>
            {description && (
              <span justify-self-end pr-2>
                {description}
              </span>
            )}
          </div>
        )}
      </For>
    </div>
  );
}
