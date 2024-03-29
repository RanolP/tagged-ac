import { CenterPart } from './components/center-part';
import { LeftPart } from './components/left-part';
import { RightPart } from './components/right-part';

export function StatusBar() {
  return (
    <div p-4>
      <div
        grid="~ areas-[auto_auto_auto]"
        w="100%"
        align-center
        h-12
        bg-pink
        px-3
        py-0
        text-6
        color-white
        font-mono
      >
        <LeftPart />
        <CenterPart />
        <RightPart />
      </div>
    </div>
  );
}
