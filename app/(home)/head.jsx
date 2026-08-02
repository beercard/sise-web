export default function Head() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/image/home-hero-mobile.webp"
        media="(max-width: 960px)"
      />
      <link
        rel="preload"
        as="image"
        href="/image/hero-hogar-desktop.webp"
        media="(min-width: 961px)"
      />
    </>
  );
}

