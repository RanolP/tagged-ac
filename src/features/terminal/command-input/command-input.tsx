import { Icon } from '~/design-system/icon/icon';

export function CommandInput() {
  return (
    <div flex="~ row" relative w-full p-2 text-12>
      <Icon name="command-box" mr-2 />
      <input h="[1em]" flex-1 border-none bg-transparent outline-none />
    </div>
  );
}
