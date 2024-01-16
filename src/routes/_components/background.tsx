interface Props {
  url?: string;
}

export function Background({
  url = 'https://source.unsplash.com/random/1920×1080/?starry,mountain',
}: Props) {
  return (
    <img
      src={url}
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
