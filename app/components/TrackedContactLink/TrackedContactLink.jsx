'use client';

import { trackEmailClick, trackPhoneClick } from '../../lib/analytics';

/*
 * Link de teléfono o mail que reporta el click a la analítica. Existe para no
 * volver cliente al footer entero (y a las páginas legales) sólo por un
 * onClick: envuelve al <a> y nada más.
 *
 * `location` describe desde dónde se hizo el click ('footer', 'contacto_hero'),
 * que es lo que después se agrupa en el informe.
 */
export default function TrackedContactLink({
  href,
  kind = 'phone',
  location,
  className,
  children,
  ...rest
}) {
  const onClick = () => {
    if (kind === 'email') trackEmailClick({ location });
    else trackPhoneClick({ location });
  };

  return (
    <a href={href} className={className} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}
