import { CenterPart } from './components/center-part';
import { LeftPart } from './components/left-part';
import { RightPart } from './components/right-part';

export function StatusBar() {
  return (
    <div>
      <LeftPart />
      <CenterPart />
      <RightPart />
    </div>
  );
}
