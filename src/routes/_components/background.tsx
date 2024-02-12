import { mergeProps } from 'solid-js';

interface Props {
  url?: string;
}

export function Background(_props: Props) {
  const props = mergeProps(
    { url: 'https://source.unsplash.com/random/1920×1080/?starry,mountain' },
    _props,
  );
  return (
    <img
      src={props.url}
      h="100%"
      w="100%"
      l-0
      t-0
      absolute
      z-0
      object-cover
      sepia-30
    />
  );
}
