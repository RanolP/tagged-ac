import { JSX, splitProps } from 'solid-js';

export type IconName =
  | 'command-prompt-box'
  | 'command-execution-circle'
  | 'null';

interface Props
  extends Omit<
    JSX.SvgSVGAttributes<SVGSVGElement>,
    'viewBox' | 'width' | 'height'
  > {
  name: IconName;
}

export function Icon(props: Props) {
  const [local, others] = splitProps(props, ['name']);
  return (
    <svg viewBox="0 0 24 24" width="1.5em" height="1.5em" {...others}>
      <use href={`/icon-bundle.svg#${local.name}`} />
    </svg>
  );
}
