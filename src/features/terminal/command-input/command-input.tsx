import { Icon } from '~/design-system/icon/icon';

export function CommandInput() {
  return (
    <div flex="~ row" relative w-full items-center p-2 text-8>
      <Icon name="command-box" mr-2 />
      <input h="[1em]" flex-1 border-none bg-transparent outline-none />
    </div>
  );
}
