import { JSX } from 'solid-js';

export type IconName = 'command-box';

interface Props
  extends Omit<
    JSX.SvgSVGAttributes<SVGSVGElement>,
    'viewBox' | 'width' | 'height'
  > {
  class?: string;
  name: IconName;
}

export function Icon({ class: className, name, ...props }: Props) {
  return (
    <svg
      class={className}
      viewBox="0 0 24 24"
      width="1.5em"
      height="1.5em"
      {...props}
    >
      <use href={`/icon-bundle.svg#${name}`} />
    </svg>
  );
}
