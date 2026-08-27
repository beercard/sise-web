import Script from 'next/script';

/*
 * Etiquetas de medición del sitio.
 *
 * GA4 va siempre. Meta Pixel y Google Ads sólo se renderizan si su ID está
 * cargado como variable de entorno, así el día que arranquen las campañas se
 * encienden desde Vercel sin tocar el código:
 *
 *   NEXT_PUBLIC_META_PIXEL_ID   → 15 dígitos del pixel de Meta
 *   NEXT_PUBLIC_GOOGLE_ADS_ID   → AW-XXXXXXXXXX
 *
 * Los tres cargan con `afterInteractive`: `lazyOnload` espera al idle del
 * navegador y se pierde las visitas que rebotan rápido.
 */
export const GA_MEASUREMENT_ID = 'G-G1WY55DRWQ';

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

export default function AnalyticsScripts() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
          ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ''}
        `}
      </Script>

      {META_PIXEL_ID ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
          `}
        </Script>
      ) : null}
    </>
  );
}
