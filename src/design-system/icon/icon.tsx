import { JSX } from 'solid-js';

export type IconName = 'command-box';

interface Props
  extends Omit<
    JSX.SvgSVGAttributes<SVGElement>,
    'viewBox' | 'width' | 'height'
  > {
  class?: string;
  name: IconName;
}

export function Icon({ class: className, name }: Props) {
  return (
    <svg class={className} viewBox="0 0 24 24" width="1em" height="1em">
      <use href={`/icon-bundle.svg#${name}`} />
    </svg>
  );
}
