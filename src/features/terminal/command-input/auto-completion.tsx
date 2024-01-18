import { JSX, splitProps } from 'solid-js';

import { Icon, IconName } from '~/design-system/icon/icon';

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
      flex="~ col"
      bg="#000 opacity-50"
      w="[calc(100%_-_3rem)]"
      text-6
      backdrop-blur-lg
      {...others}
    >
      {local.suggestions.map(({ value, icon, description }) => (
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
      ))}
    </div>
  );
}
