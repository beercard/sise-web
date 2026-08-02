export default function Head() {
  const IMAGE_OPTIMIZER_QUALITY = 75;

  const buildOptimizedImageUrl = (src, width) => {
    const url = encodeURIComponent(src);
    return `/_next/image?url=${url}&w=${width}&q=${IMAGE_OPTIMIZER_QUALITY}`;
  };

  const buildSrcSet = (src, widths) =>
    widths.map((width) => `${buildOptimizedImageUrl(src, width)} ${width}w`).join(', ');

  const heroDesktop = '/image/hero-hogar-desktop.webp';
  const heroMobile = '/image/home-hero-mobile.webp';

  return (
    <>
      <link
        rel="preload"
        as="image"
        href={buildOptimizedImageUrl(heroDesktop, 1200)}
        imageSrcSet={buildSrcSet(heroDesktop, [960, 1080, 1200, 1920])}
        imageSizes="(min-width: 961px) 952px, 100vw"
      />
      <link
        rel="preload"
        as="image"
        href={buildOptimizedImageUrl(heroMobile, 828)}
        imageSrcSet={buildSrcSet(heroMobile, [384, 640, 828])}
        imageSizes="(max-width: 600px) 412px, (max-width: 960px) 720px, 952px"
        media="(max-width: 960px)"
      />
    </>
  );
}
