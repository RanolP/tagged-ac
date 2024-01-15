import { createSignal, onCleanup } from 'solid-js';

export function RightPart() {
  const [now, setNow] = createSignal<Date>(new Date());
  const interval = setInterval(() => setNow(new Date()), 1000);
  onCleanup(() => clearInterval(interval));

  return (
    <div flex="~ row" items-center justify-self-start justify-self-end>
      <span>{formatDate(now())}</span>
    </div>
  );
}

const formatDate = (date: Date | null) =>
  date ? `${date.getHours()}:${date.getMinutes()}` : '--:--';
