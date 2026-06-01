'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

import styles from '../../page.module.scss';

const ANIMATION_MS = 420;

const TAB_IDS = {
  PERIMETRAL: 'perimetral',
  INTERIOR: 'interior',
  CONECTIVIDAD: 'conectividad'
};

const getDirection = (currentIndex, nextIndex) => {
  if (nextIndex === currentIndex) return 'next';
  return nextIndex > currentIndex ? 'next' : 'prev';
};

export default function TechnologyModule() {
  const tabs = useMemo(
    () => [
      {
        id: TAB_IDS.PERIMETRAL,
        label: 'PROTECCIÓN PERIMETRAL',
        houseClassName: styles.housePerimetral,
        points: [
          { id: 'cerco', label: 'Cerco eléctrico perimetral', pointClassName: styles.ellipse1 },
          { id: 'camaras', label: 'Cámaras de vigilancia', pointClassName: styles.ellipse12 },
          { id: 'magneticos', label: 'Magnéticos', pointClassName: styles.ellipse13 },
          { id: 'cartel', label: 'Cartel disuasivo', pointClassName: styles.ellipse14 },
          { id: 'sirena', label: 'Sirena exterior', pointClassName: styles.ellipse15 }
        ],
        slides: [
          {
            title: 'Cerco eléctrico perimetral',
            text: 'Primera barrera de seguridad que protege tu propiedad y disuade ingresos no autorizados.',
            styleVars: {
              '--tech-card-padding': '42px 83px 22px',
              '--tech-card-image-width': '215px',
              '--tech-card-image-height': '154px',
              '--tech-card-image-margin': '24px 0 0'
            },
            art: { type: 'image', src: '/image/mpudc5hr-kxw5icp.png', width: 215, height: 154 }
          },
          {
            title: 'Cámaras de vigilancia',
            text: 'Supervisión en tiempo real y grabación continua para mayor control y tranquilidad.',
            styleVars: {
              '--tech-card-padding': '42px 83px',
              '--tech-card-image-width': '192px',
              '--tech-card-image-height': '117px',
              '--tech-card-image-margin': '17px 0 0'
            },
            art: { type: 'image', src: '/image/mpuk8l58-7ujlops.png', width: 192, height: 117 }
          },
          {
            title: 'Magnéticos',
            text: 'Protección inteligente en puertas y ventanas con alerta inmediata ante aperturas.',
            styleVars: {
              '--tech-card-padding': '48px 84px 33px 82px',
              '--tech-card-align-items': 'flex-start',
              '--tech-card-title-min-height': '31px',
              '--tech-card-text-margin': '12px 0 0 7px',
              '--tech-card-image-width': '160px',
              '--tech-card-image-height': '160px',
              '--tech-card-image-margin': '14px 0 0 60px'
            },
            art: { type: 'image', src: '/image/mpuk98wo-z2d321o.png', width: 160, height: 160 }
          },
          {
            title: 'Cartel disuasivo',
            text: 'Refuerza visualmente la seguridad del lugar e informa protección monitoreada.',
            styleVars: {
              '--tech-card-padding': '48px 82px 51px 84px',
              '--tech-card-align-items': 'flex-start',
              '--tech-card-title-min-height': '31px',
              '--tech-card-text-margin': '12px 0 0',
              '--tech-card-image-width': '139px',
              '--tech-card-image-height': '147px',
              '--tech-card-image-margin': '9px 0 0 68px'
            },
            art: { type: 'image', src: '/image/mpul2hzn-fvb6ziy.png', width: 139, height: 147 }
          },
          {
            title: 'Sirena exterior',
            text: 'Alerta sonora de alto alcance que ahuyenta intrusos y activa la atención del entorno.',
            styleVars: {
              '--tech-card-padding': '48px 83px 44px',
              '--tech-card-title-min-height': '31px',
              '--tech-card-text-margin': '12px 0 0',
              '--tech-card-sirena-margin-top': '14px'
            },
            art: {
              type: 'sirena',
              backgroundSrc: '/image/mpul3d3a-hllgx9l.png',
              svgSrc: '/image/mpul3d39-q38k68v.svg'
            }
          }
        ]
      },
      {
        id: TAB_IDS.INTERIOR,
        label: 'PROTECCIÓN INTERIOR',
        houseClassName: styles.houseInterior,
        points: [
          { id: 'sensor', label: 'Sensor de movimiento', pointClassName: styles.ellipse1 },
          { id: 'teclado', label: 'Teclado de configuración', pointClassName: styles.ellipse12 },
          { id: 'mando', label: 'Mando a distancia', pointClassName: styles.ellipse13 },
          { id: 'central', label: 'Central con comunicador', pointClassName: styles.ellipse14 },
          { id: 'camara', label: 'Cámara inteligente interior', pointClassName: styles.ellipse15 }
        ],
        slides: [
          {
            title: 'Sensor de movimiento',
            text: 'Detecta movimientos sospechosos y activa el sistema de alerta automáticamente.',
            styleVars: {
              '--tech-card-padding': '35px 83px 13px'
            },
            art: {
              type: 'overlay',
              wrapperWidth: 193,
              wrapperHeight: 180,
              wrapperMarginTop: 66,
              image: { src: '/image/mpul6mkt-g5lny44.png', width: 193, height: 180, top: 0, left: 0 },
              text: { top: -55, right: -40, width: 273 }
            }
          },
          {
            title: 'Teclado de configuración',
            text: 'Gestión simple y rápida para controlar tu alarma en todo momento.',
            styleVars: {
              '--tech-card-padding': '35px 83px 189px',
              '--tech-card-text-margin': '11px 0 0'
            },
            art: {
              type: 'absolute',
              src: '/image/mpul7gfa-5619l3v.png',
              width: 201,
              height: 188,
              top: 157,
              left: 121,
              rotate: 0
            }
          },
          {
            title: 'Mando a distancia',
            text: 'Activá o desactivá tu sistema con comodidad.',
            styleVars: {
              '--tech-card-padding': '48px 83px 220px',
              '--tech-card-title-min-height': '31px',
              '--tech-card-text-margin': '19px 0 0',
              '--tech-card-text-width': '216px'
            },
            art: {
              type: 'absolute',
              src: '/image/mpul934z-n4p35pf.png',
              width: 175,
              height: 164,
              top: 154,
              left: 132,
              rotate: 16
            }
          },
          {
            title: 'Central con comunicador',
            text: 'Tecnología centralizada que conecta, procesa y reporta cada evento de seguridad.',
            styleVars: {
              '--tech-card-padding': '35px 83px 22px',
              '--tech-card-align-items': 'flex-start',
              '--tech-card-text-margin': '13px 0 0 15px',
              '--tech-card-text-width': '246px',
              '--tech-card-image-width': '219px',
              '--tech-card-image-height': '156px',
              '--tech-card-image-margin': '9px 0 0 27px'
            },
            art: { type: 'image', src: '/image/mpul9o4z-m9vtkfc.png', width: 219, height: 156 }
          },
          {
            title: 'Cámara inteligente interior',
            text: 'Monitoreo interno en vivo con alertas inteligentes desde tu celular.',
            styleVars: {
              '--tech-card-padding': '35px 83px 46px',
              '--tech-card-text-margin': '16px 0 0',
              '--tech-card-text-width': '211px',
              '--tech-card-image-width': '192px',
              '--tech-card-image-height': '117px',
              '--tech-card-image-margin': '21px 0 0'
            },
            art: { type: 'image', src: '/image/mpula57w-bujdbk3.png', width: 192, height: 117 }
          }
        ]
      },
      {
        id: TAB_IDS.CONECTIVIDAD,
        label: 'CONECTIVIDAD',
        houseClassName: styles.houseConectividad,
        points: [{ id: 'app', label: 'Control desde el celular', pointClassName: styles.ellipse13 }],
        slides: [
          {
            title: 'Control desde el celular',
            text: 'Administrá tu sistema, recibí notificaciones y monitoreá tu hogar o negocio estés donde estés.',
            styleVars: {
              '--tech-card-padding': '42px 120px 20px 121px',
              '--tech-card-title-min-height': '63px',
              '--tech-card-title-width': '201px',
              '--tech-card-title-height': '63px'
            },
            art: {
              type: 'connectivity',
              backgroundSrc: '/image/mpulc23z-ua6f137.png',
              wrapperWidth: 183,
              wrapperHeight: 158,
              wrapperMarginTop: 74,
              text: { top: -57, right: -55, width: 292 }
            }
          }
        ]
      }
    ],
    []
  );

  const [activeTabId, setActiveTabId] = useState(TAB_IDS.PERIMETRAL);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [direction, setDirection] = useState('next');
  const [tabNonce, setTabNonce] = useState(0);

  const activeIndexRef = useRef(activeIndex);
  const animTimeoutRef = useRef(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      if (animTimeoutRef.current) {
        window.clearTimeout(animTimeoutRef.current);
      }
    };
  }, []);

  const activeTab = useMemo(
    () => tabs.find((tab) => tab.id === activeTabId) ?? tabs[0],
    [activeTabId, tabs]
  );

  const slides = activeTab.slides;
  const points = activeTab.points;

  const startTransition = (nextIndex, nextDirection) => {
    const currentIndex = activeIndexRef.current;
    if (nextIndex === currentIndex) return;

    if (animTimeoutRef.current) window.clearTimeout(animTimeoutRef.current);

    setDirection(nextDirection);
    setPreviousIndex(currentIndex);
    setActiveIndex(nextIndex);

    animTimeoutRef.current = window.setTimeout(() => {
      setPreviousIndex(null);
      animTimeoutRef.current = null;
    }, ANIMATION_MS);
  };

  const handleSelectPoint = (index) => {
    startTransition(index, getDirection(activeIndexRef.current, index));
  };

  const handlePrev = () => {
    const currentIndex = activeIndexRef.current;
    startTransition((currentIndex - 1 + slides.length) % slides.length, 'prev');
  };

  const handleNext = () => {
    const currentIndex = activeIndexRef.current;
    startTransition((currentIndex + 1) % slides.length, 'next');
  };

  const handleTabChange = (tabId) => {
    if (tabId === activeTabId) return;
    if (animTimeoutRef.current) window.clearTimeout(animTimeoutRef.current);

    setActiveTabId(tabId);
    setPreviousIndex(null);
    setActiveIndex(0);
    setDirection('next');
    setTabNonce((nonce) => nonce + 1);
  };

  const currentSlide = slides[activeIndex];
  const previousSlide = previousIndex === null ? null : slides[previousIndex];
  const isAnimating = previousIndex !== null;

  const getCardClassName = (phase) => {
    if (phase === 'active') {
      if (!isAnimating) return styles.techCardStatic;
      return direction === 'next' ? styles.techCardEnterNext : styles.techCardEnterPrev;
    }

    return direction === 'next' ? styles.techCardExitNext : styles.techCardExitPrev;
  };

  const renderSlideContent = (slide, extraClassName) => {
    if (!slide) return null;

    const style = slide.styleVars ? { ...slide.styleVars } : undefined;
    const shouldRenderMainText = slide.art?.type !== 'overlay' && slide.art?.type !== 'connectivity';

    return (
      <div className={`${styles.techCard} ${extraClassName}`} style={style}>
        <p className={styles.techCardTitle}>{slide.title}</p>
        {shouldRenderMainText ? <p className={styles.techCardText}>{slide.text}</p> : null}
        {slide.art?.type === 'image' ? (
          <Image
            src={slide.art.src}
            alt=""
            className={styles.techCardImage}
            width={slide.art.width}
            height={slide.art.height}
          />
        ) : null}
        {slide.art?.type === 'absolute' ? (
          <Image
            src={slide.art.src}
            alt=""
            className={styles.techCardAbsoluteImage}
            width={slide.art.width}
            height={slide.art.height}
            style={{
              top: `${slide.art.top}px`,
              left: `${slide.art.left}px`,
              transform: `rotate(${slide.art.rotate}deg)`
            }}
          />
        ) : null}
        {slide.art?.type === 'overlay' ? (
          <div
            className={styles.techCardOverlay}
            style={{
              width: `${slide.art.wrapperWidth}px`,
              height: `${slide.art.wrapperHeight}px`,
              marginTop: slide.art.wrapperMarginTop ? `${slide.art.wrapperMarginTop}px` : undefined
            }}
          >
            <p
              className={styles.techCardOverlayText}
              style={{
                top: `${slide.art.text.top}px`,
                right: `${slide.art.text.right}px`,
                width: `${slide.art.text.width}px`
              }}
            >
              {slide.text}
            </p>
            <Image
              src={slide.art.image.src}
              alt=""
              className={styles.techCardOverlayImage}
              width={slide.art.image.width}
              height={slide.art.image.height}
            />
          </div>
        ) : null}
        {slide.art?.type === 'sirena' ? (
          <div className={styles.techCardSirenaFrame} style={{ '--sirena-bg': `url('${slide.art.backgroundSrc}')` }}>
            <Image src={slide.art.svgSrc} alt="" width={69} height={24} className={styles.techCardSirenaSvg} />
          </div>
        ) : null}
        {slide.art?.type === 'connectivity' ? (
          <div
            className={styles.techCardConnectivityWrap}
            style={{
              width: `${slide.art.wrapperWidth}px`,
              height: `${slide.art.wrapperHeight}px`,
              marginTop: slide.art.wrapperMarginTop ? `${slide.art.wrapperMarginTop}px` : undefined
            }}
          >
            <p
              className={styles.techCardConnectivityText}
              style={{
                top: `${slide.art.text.top}px`,
                right: `${slide.art.text.right}px`,
                width: `${slide.art.text.width}px`
              }}
            >
              {slide.text}
            </p>
            <div
              className={styles.techCardConnectivityImage}
              style={{ '--connectivity-bg': `url('${slide.art.backgroundSrc}')` }}
              aria-hidden="true"
            >
              <div className={styles.techCardConnectivityBar} />
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <section className={styles.technology} aria-label="Tecnología inteligente">
      <h2 className={styles.technologyTitle}>
        <span className={styles.technologyTitleStrong}>Tu hogar seguro en cada rincón</span>
        <br />
        <span className={styles.technologyTitleLight}>con tecnología inteligente</span>
      </h2>

      <div className={styles.tabs} role="tablist" aria-label="Categorías">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          const underlineClassName =
            tab.id === TAB_IDS.PERIMETRAL
              ? styles.tabUnderlinePerimetral
              : tab.id === TAB_IDS.INTERIOR
                ? styles.tabUnderlineInterior
                : styles.tabUnderlineConectividad;

          return (
            <button
              key={tab.id}
              type="button"
              className={`${styles.tab} ${isActive ? styles.tabActive : ''} ${isActive ? underlineClassName : ''}`}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className={styles.technologyRow} data-anim={tabNonce}>
        <div className={`${styles.house} ${activeTab.houseClassName}`} aria-label="Plano hogar">
          {points.map((point, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={point.id}
                type="button"
                className={`${styles.pointButton} ${point.pointClassName} ${isActive ? styles.pointActive : ''}`}
                aria-label={point.label}
                aria-pressed={isActive}
                onClick={() => handleSelectPoint(index)}
              >
                <span className={styles.ellipse2} aria-hidden="true">
                  <span className={styles.ellipse3} aria-hidden="true" />
                </span>
              </button>
            );
          })}
        </div>

        <div className={styles.techCardGroup} aria-label="Detalle">
          {slides.length > 1 ? (
            <button type="button" className={styles.techArrow} aria-label="Anterior" onClick={handlePrev}>
              <Image src="/image/mpudc5hg-jng7cpc.png" alt="" width={30} height={18} />
            </button>
          ) : (
            <span className={styles.techArrowSpacer} aria-hidden="true" />
          )}

          <div className={`${styles.techCardViewport} ${styles.tabFadeIn}`} key={`${activeTabId}-${tabNonce}`}>
            {previousSlide ? renderSlideContent(previousSlide, getCardClassName('previous')) : null}
            {renderSlideContent(currentSlide, getCardClassName('active'))}
          </div>

          {slides.length > 1 ? (
            <button type="button" className={styles.techArrow} aria-label="Siguiente" onClick={handleNext}>
              <Image src="/image/mpudc5hg-5099gqg.png" alt="" width={30} height={17} />
            </button>
          ) : (
            <span className={styles.techArrowSpacer} aria-hidden="true" />
          )}
        </div>
      </div>
    </section>
  );
}
