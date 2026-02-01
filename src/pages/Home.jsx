import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../assets/Nav.jsx';
import '../styles/styles.css';
import { categories, products } from '../../data.js';
import { themeToCssVars } from '../utils/categoryTheme.js';

function findProductByName(name) {
  return products.find((p) => String(p.name) === String(name));
}

export default function Home() {
  const containerRef = useRef(null);
  const slideRefs = useRef([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const safeCategories = useMemo(() => {
    return Array.isArray(categories) ? categories : [];
  }, []);

  const renderedCategories = useMemo(() => {
    return safeCategories;
  }, [safeCategories]);

  const activeCategory = safeCategories[activeIndex] ?? safeCategories[0];

  const navThemeStyle = useMemo(() => {
    if (!activeCategory) return undefined;

    const base = themeToCssVars(activeCategory);
    return {
      ...base,
      fontFamily: 'var(--cat-font-family)',
      '--nav-bg': 'var(--cat-primary)',
      '--nav-border': 'rgba(255,255,255,0.16)',
      '--nav-link': 'var(--cat-text-primary)',
      '--nav-link-muted': 'var(--cat-text-secondary)',
    };
  }, [activeCategory]);

  const scrollToRenderIndex = (idx, behavior = 'smooth') => {
    const el = slideRefs.current[idx];
    if (el) el.scrollIntoView({ behavior, inline: 'start', block: 'nearest' });
  };

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Note: automatic carousel autoscroll removed; navigation now only via controls or user scroll.


  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    if (!slideRefs.current.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        const top = visible[0];
        if (!top?.target) return;

        const realIdx = Number(top.target.getAttribute('data-real-index'));
        if (!Number.isNaN(realIdx)) setActiveIndex(realIdx);
      },
      {
        root,
        threshold: [0.55, 0.65, 0.75],
      },
    );

    slideRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, [renderedCategories.length, safeCategories.length]);

  // No looping behavior; start at first slide and let scroll-snap clamp naturally.


  return (
    <div
      className="home-page"
      style={
        activeCategory
          ? {
              ...themeToCssVars(activeCategory),
              fontFamily: 'var(--cat-font-family)',
              '--home-accent': activeCategory['secondary-color'],
              '--glow-color': activeCategory['secondary-color'],
              background:
                `linear-gradient(135deg, ${activeCategory['primary-color']} 0%, ${activeCategory['secondary-color']} 100%)`,
            }
          : undefined
      }
    >
      <Nav themeStyle={navThemeStyle} className="navbar-overlay" />

      <div className="home-carousel-wrap">
        <button
          type="button"
          className="home-arrow home-arrow-left"
          onClick={() => {
            if (safeCategories.length <= 1) return;
            const current = activeIndexRef.current;
            if (current > 0) {
              scrollToRenderIndex(current - 1);
            }
          }}
          disabled={activeIndex <= 0}
          aria-label="Previous category"
        >
          ‹
        </button>

        <div className="home-carousel" ref={containerRef}>
          {renderedCategories.map((cat, renderIdx) => {
          const realIdx = renderIdx;
          const featuredNames = Array.isArray(cat['featured-products']) ? cat['featured-products'] : [];
          const featuredProducts = featuredNames
            .map((name) => ({ name, product: findProductByName(name) }))
            .filter((x) => Boolean(x.name));

          const primary = cat['primary-color'];
          const secondary = cat['secondary-color'];
          const backgroundImage = cat['background-image'];

          const slideBg = backgroundImage
            ? `linear-gradient(135deg, ${secondary} 0%, ${primary} 55%, rgba(0,0,0,0.15) 100%), url(/ShoeCommerce/${backgroundImage})`
            : `linear-gradient(135deg, ${secondary} 0%, ${primary} 100%)`;

          return (
            <section
              key={`${cat.name}-${renderIdx}`}
              className="home-slide"
              data-real-index={realIdx}
              ref={(el) => {
                slideRefs.current[renderIdx] = el;
              }}
              style={{ backgroundImage: slideBg }}
            >
              <div className="home-slide-content">
                <div className="home-kicker">{cat.name}</div>
                <h1 className="home-slide-title">{cat.description1}</h1>
                <ul className="home-bullets">
                  <li>{cat.description2}</li>
                  <li>{cat.description3}</li>
                </ul>

                <div className="home-featured">
                  <div className="home-featured-title">Featured</div>
                  <div className="home-featured-items">
                    {featuredProducts.map(({ name, product }) =>
                      product ? (
                        <Link key={name} className="home-chip" to={`/product/${product.id}`}>
                          {product.name}
                        </Link>
                      ) : (
                        <span key={name} className="home-chip home-chip-disabled">
                          {name}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <div className="home-cta-row">
                  <Link className="home-cta home-cta-primary" to="/catalog">
                    Browse catalog
                  </Link>
                  <Link className="home-cta home-cta-secondary" to="/cart">
                    Go to cart
                  </Link>
                  <button
                    type="button"
                    className="home-cta home-cta-tertiary"
                    onClick={() => {
                      if (safeCategories.length <= 1) return;
                      const current = activeIndexRef.current;
                      if (current < safeCategories.length - 1) {
                        scrollToRenderIndex(current + 1);
                      }
                    }}
                    disabled={activeIndex >= safeCategories.length - 1}
                  >
                    Next ›
                  </button>
                </div>
              </div>
            </section>
          );
          })}
        </div>

        <button
          type="button"
          className="home-arrow home-arrow-right"
          onClick={() => {
            if (safeCategories.length <= 1) return;
            const current = activeIndexRef.current;
            if (current < safeCategories.length - 1) {
              scrollToRenderIndex(current + 1);
            }
          }}
          disabled={activeIndex >= safeCategories.length - 1}
          aria-label="Next category"
        >
          ›
        </button>
      </div>
    </div>
  );
}