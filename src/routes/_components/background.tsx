interface Props {
  url?: string;
}

export function Background(props: Props) {
  return (
    <img
      src={
        props.url ??
        'https://source.unsplash.com/random/1920×1080/?starry,mountain'
      }
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
