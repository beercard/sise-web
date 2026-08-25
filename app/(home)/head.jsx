export default function Head() {
  /*
   * Precarga las fotos del primer slide del carrusel (las mismas del hero de
   * /hogar). Van sin el optimizador de Next porque ya están exportadas al
   * tamaño final; cada media query evita bajar la variante que no se muestra.
   */
  const heroDesktop = '/image/hero-hogar-casa-desktop.webp';
  const heroMobile = '/image/hero-hogar-casa-mobile.webp';

  return (
    <>
      <link rel="preload" as="image" href={heroDesktop} media="(min-width: 961px)" />
      <link rel="preload" as="image" href={heroMobile} media="(max-width: 960px)" />
    </>
  );
}
