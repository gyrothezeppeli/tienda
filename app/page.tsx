"use client";

import React, { useState, useEffect } from 'react';

// =========================================================================
// 1. BASE DE DATOS DE PRODUCTOS
// =========================================================================
interface Product {
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  status: string;
  label?: string;
  badge?: string;
  image: string; 
  fallbackIcon: string; 
}

const PRODUCT_TEMPLATE_DATABASE: Product[] = [
  { 
    name: "Steelmay Les Paul Sunburst", 
    category: "guitarras", 
    price: 160, 
    originalPrice: 220,
    status: "Nuevo",
    label: "REBAJA",
    image: "/img/steel.jpg", 
    fallbackIcon: "🎸" 
  },
  { 
    name: "Epiphone Les Paul 100", 
    category: "guitarras", 
    price: 400, 
    originalPrice: 499,
    status: "Segunda mano - Impecable",
    label: "REBAJA",
    image: "/img/lp100.jpg", 
    fallbackIcon: "🎸" 
  },
  { 
    name: "M-Vave Mini Universe Reverb", 
    category: "pedales", 
    price: 80, 
    originalPrice: 120,
    status: "Nuevo",
    label: "REBAJA",
    badge: "Outlet",
    image: "", 
    fallbackIcon: "🎛️" 
  },
  { 
    name: "D'Addario XT 10-46 Strings", 
    category: "cuerdas", 
    price: 14.99, 
    status: "Nuevo",
    image: "", 
    fallbackIcon: "〰️" 
  },
  { 
    name: "Correa Retro Jacquard", 
    category: "correas", 
    price: 24.99, 
    originalPrice: 35,
    status: "Nuevo",
    label: "REBAJA",
    image: "", 
    fallbackIcon: "🎗️" 
  },
  { 
    name: "Cable de Instrumento Pro 3m", 
    category: "cables", 
    price: 19.99, 
    status: "Nuevo",
    image: "", 
    fallbackIcon: "🔌" 
  }
];

const CATEGORY_FILTERS = [
  { id: "todos", label: "Todos" },
  { id: "guitarras", label: "Guitarras" },
  { id: "cuerdas", label: "Cuerdas" },
  { id: "cables", label: "Cables" },
  { id: "pedales", label: "Pedales" },
  { id: "correas", label: "Correas" }
];

// =========================================================================
// 2. PALETA COMPLETA EXTRAÍDA (MÁXIMA VIDA Y CONTRASTE)
// =========================================================================
const PALETTE = {
  darkBg: '#050811',         
  darkCard: 'rgba(11, 19, 43, 0.75)', 

  gargantua: '#E8F957',      // Amarillo verdoso brillante
  pear: '#BBE11A',           // Verde lima eléctrico
  morningDew: '#C1E5FB',     // Azul cielo pastel
  celestialBlue: '#86D0FD',  // Azul cielo brillante
  havelock: '#4891E7',       // Azul medio vibrante
  smalt: '#042C8F',          // Azul profundo eléctrico
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: 1024, height: 768 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { ...windowSize, isMounted };
};

const MusicStoreCatalog: React.FC = () => {
  const { width, isMounted } = useWindowSize();
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});

  const isMobile = isMounted ? width < 768 : false;
  const isTablet = isMounted ? (width >= 768 && width < 1024) : false;

  const toggleFavorite = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const filteredProducts = PRODUCT_TEMPLATE_DATABASE.filter(product => {
    const matchesCategory = selectedCategory === "todos" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!isMounted) return <div style={{ background: PALETTE.darkBg, minHeight: '100vh' }} />;

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      backgroundColor: PALETTE.darkBg,
      color: '#ffffff',
      minHeight: '100vh',
      overflowX: 'hidden',
      padding: isMobile ? '12px' : '30px 6%',
      position: 'relative'
    }}>
      
      {/* --- AURAS DE LUZ INTENSAS (GRADIENTES VIVOS DE FONDO) --- */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        left: '10%',
        width: '60vw',
        height: '60vw',
        background: `radial-gradient(circle, rgba(72, 145, 231, 0.25) 0%, rgba(4, 44, 143, 0) 70%)`,
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '-10%',
        width: '50vw',
        height: '50vw',
        background: `radial-gradient(circle, rgba(187, 225, 26, 0.18) 0%, rgba(5, 8, 17, 0) 60%)`,
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '5%',
        width: '55vw',
        height: '55vw',
        background: `radial-gradient(circle, rgba(134, 208, 253, 0.15) 0%, rgba(4, 44, 143, 0) 70%)`,
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      {/* --- ESTILOS CON ANIMACIONES INTERACTIVAS DE NEÓN --- */}
      <style>{`
        .grid-overlay {
          background-size: 50px 50px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
        }

        .premium-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .premium-card:hover {
          transform: translateY(-8px);
          border-color: ${PALETTE.pear} !important;
          box-shadow: 0 15px 45px -10px rgba(187, 225, 26, 0.25), 
                      0 0 15px -3px rgba(187, 225, 26, 0.15);
        }

        .product-img-wrapper img {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .premium-card:hover .product-img-wrapper img {
          transform: scale(1.1) rotate(2deg);
        }

        .fav-btn {
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .fav-btn:hover {
          transform: scale(1.2);
          background-color: rgba(255, 255, 255, 0.2) !important;
          box-shadow: 0 0 10px ${PALETTE.celestialBlue};
        }

        .pill-btn {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pill-btn:hover {
          background: rgba(72, 145, 231, 0.1) !important;
          border-color: ${PALETTE.celestialBlue} !important;
          color: ${PALETTE.morningDew} !important;
          box-shadow: 0 0 15px rgba(134, 208, 253, 0.15);
        }

        .sparkle-floating {
          animation: sparkleFloat 6s ease-in-out infinite;
        }
        @keyframes sparkleFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); filter: drop-shadow(0 0 10px ${PALETTE.gargantua}); }
          50% { transform: translateY(-15px) rotate(10deg) scale(1.08); filter: drop-shadow(0 0 25px ${PALETTE.pear}); }
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; filter: drop-shadow(0 0 8px ${PALETTE.pear}); }
        }
        .badge-live {
          animation: pulseGlow 2s infinite;
        }
      `}</style>
      
      {/* Contenedor Principal Dashboard */}
      <div 
        className="grid-overlay"
        style={{
          background: 'rgba(7, 12, 25, 0.85)',
          borderRadius: '32px',
          border: `1px solid rgba(255, 255, 255, 0.08)`,
          boxShadow: '0 50px 120px -30px rgba(0, 0, 0, 0.85)',
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >

        {/* --- HEADER --- */}
        <header style={{
          position: 'relative',
          paddingBottom: isMobile ? '40px' : '70px',
          borderBottom: `1px solid rgba(255, 255, 255, 0.05)`,
          overflow: 'hidden',
        }}>
          
          {/* Barra de Navegación */}
          <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: isMobile ? '1.5rem 5%' : '2rem 5%',
            fontSize: '0.8rem',
            fontWeight: '800',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            position: 'relative',
            zIndex: 2,
            borderBottom: `1px solid rgba(255, 255, 255, 0.03)`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: PALETTE.pear, fontWeight: '900' }}>
              <span style={{ fontSize: '1.3rem', filter: `drop-shadow(0 0 5px ${PALETTE.pear})` }}>⚡</span> SONICLAB
            </div>
            <div style={{ display: 'flex', gap: '24px' }} className="is-desktop-only">
              <a href="#" style={{ color: '#ffffff', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = PALETTE.gargantua} onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}>Equipos</a>
              <a href="#" style={{ color: '#ffffff', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = PALETTE.gargantua} onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}>Novedades</a>
              <a href="#" style={{ color: '#ffffff', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = PALETTE.gargantua} onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}>Soporte</a>
            </div>
            <div>
              <span style={{ cursor: 'pointer', fontSize: '1.2rem', padding: '8px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)' }}>🛍️</span>
            </div>
          </nav>

          {/* Hero Content */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.3fr 0.7fr',
            padding: isMobile ? '2.5rem 5% 0' : '4.5rem 5% 0',
            alignItems: 'center',
            position: 'relative',
            zIndex: 2
          }}>
            <div>
              {/* Badge de Novedad */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: `linear-gradient(90deg, rgba(187, 225, 26, 0.15) 0%, rgba(72, 145, 231, 0.1) 100%)`,
                border: `1px solid rgba(187, 225, 26, 0.3)`,
                padding: '6px 14px',
                borderRadius: '99px',
                fontSize: '0.75rem',
                fontWeight: '700',
                color: PALETTE.gargantua,
                marginBottom: '1.8rem',
                boxShadow: `0 0 15px rgba(187, 225, 26, 0.1)`
              }}>
                <span className="badge-live" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: PALETTE.pear }} />
                SINTONIZA LO ÚLTIMO EN AUDIO
              </div>

              {/* TÍTULO ACTUALIZADO A PETICIÓN DEL USUARIO */}
              <h1 style={{
                fontSize: isMobile ? '2.3rem' : '4rem',
                fontWeight: '900',
                lineHeight: '1.1',
                letterSpacing: '-2px',
                margin: '0 0 1.5rem 0',
                background: `linear-gradient(135deg, #ffffff 30%, ${PALETTE.celestialBlue} 70%, ${PALETTE.havelock} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Tu tienda de confianza, <br />
                música y accesorios.
              </h1>
              
              <p style={{
                fontSize: isMobile ? '0.9rem' : '1.1rem',
                color: PALETTE.morningDew,
                opacity: 0.85,
                maxWidth: '520px',
                lineHeight: '1.65',
                margin: '0 0 2.2rem 0'
              }}>
                Explora el catálogo premium con las texturas y matices que solo los mejores procesadores analógicos y digitales pueden ofrecer.
              </p>

              <button style={{
                background: `linear-gradient(135deg, ${PALETTE.pear} 0%, ${PALETTE.gargantua} 100%)`,
                color: '#042C8F',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '14px',
                fontWeight: '800',
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: `0 10px 30px rgba(187, 225, 26, 0.35)`,
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 15px 35px rgba(187, 225, 26, 0.5)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = `0 10px 30px rgba(187, 225, 26, 0.35)`;
              }}
              >
                Explorar Catálogo <span style={{ fontSize: '1.1rem' }}>→</span>
              </button>
            </div>

            {/* Estrellas Estilo SaaS de Fondo */}
            <div style={{
              position: 'relative',
              height: isMobile ? '160px' : '280px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                position: 'absolute',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${PALETTE.pear} 0%, rgba(187, 225, 26, 0) 70%)`,
                opacity: 0.25,
                filter: 'blur(10px)',
                zIndex: 0
              }} />

              <svg className="sparkle-floating" width="130" height="130" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', zIndex: 2 }}>
                <path d="M50 0C50 27.6142 27.6142 50 0 50C27.6142 50 50 72.3858 50 100C50 72.3858 72.3858 50 100 50C72.3858 50 50 27.6142 50 0Z" fill="url(#sparkle-grad)" />
                <defs>
                  <linearGradient id="sparkle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="60%" stopColor={PALETTE.gargantua} />
                    <stop offset="100%" stopColor={PALETTE.pear} />
                  </linearGradient>
                </defs>
              </svg>
              
              <svg className="sparkle-floating" width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', transform: 'translate(70px, -70px)', zIndex: 1, opacity: 0.85 }}>
                <path d="M50 0C50 27.6142 27.6142 50 0 50C27.6142 50 50 72.3858 50 100C50 72.3858 72.3858 50 100 50C72.3858 50 50 27.6142 50 0Z" fill={PALETTE.celestialBlue} />
              </svg>
            </div>
          </div>
        </header>

        {/* --- BUSCADOR Y FILTROS --- */}
        <section style={{ padding: '40px 5% 30px', position: 'relative', zIndex: 3 }}>
          <div style={{ marginBottom: '35px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '650px' }}>
              <input 
                type="text" 
                placeholder="Buscar guitarras, pedales, accesorios..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '18px 24px 18px 58px',
                  borderRadius: '16px',
                  border: `1px solid rgba(134, 208, 253, 0.25)`,
                  background: 'rgba(11, 19, 43, 0.6)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  outline: 'none',
                  backdropFilter: 'blur(20px)',
                  boxShadow: `0 10px 40px -15px rgba(4, 44, 143, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.1)`,
                  fontFamily: 'inherit',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = PALETTE.gargantua;
                  e.target.style.boxShadow = `0 0 25px rgba(187, 225, 26, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.1)`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(134, 208, 253, 0.25)';
                  e.target.style.boxShadow = `0 10px 40px -15px rgba(4, 44, 143, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.1)`;
                }}
              />
              <span style={{
                position: 'absolute',
                left: '22px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '1.25rem',
                color: PALETTE.celestialBlue
              }}>🔍</span>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '15px',
            justifyContent: isMobile ? 'flex-start' : 'center',
            WebkitOverflowScrolling: 'touch'
          }}>
            {CATEGORY_FILTERS.map((filter) => {
              const isActive = selectedCategory === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedCategory(filter.id)}
                  className="pill-btn"
                  style={{
                    background: isActive ? `linear-gradient(135deg, ${PALETTE.pear} 0%, ${PALETTE.gargantua} 100%)` : 'rgba(255, 255, 255, 0.03)',
                    color: isActive ? '#042C8F' : '#ffffff',
                    border: isActive ? `1px solid ${PALETTE.gargantua}` : '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '10px 24px',
                    borderRadius: '99px',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    boxShadow: isActive ? `0 4px 20px rgba(187, 225, 26, 0.35)` : 'none',
                  }}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* --- CATÁLOGO --- */}
        <section style={{ padding: '20px 5% 70px' }}>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '40px'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '800',
              margin: 0,
              background: `linear-gradient(90deg, #ffffff 0%, ${PALETTE.morningDew} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Línea de Equipamiento
            </h3>
            <span style={{ fontSize: '0.85rem', color: PALETTE.celestialBlue, fontWeight: '600' }}>
              {filteredProducts.length} DISPONIBLES
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)',
            gap: '28px',
          }}>
            {filteredProducts.map((product, index) => {
              const isFav = !!favorites[index];
              const hasDiscount = product.originalPrice && product.originalPrice > product.price;

              return (
                <div 
                  key={index} 
                  className="premium-card" 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    background: PALETTE.darkCard,
                    border: `1px solid rgba(255, 255, 255, 0.06)`,
                    borderRadius: '24px',
                    padding: '22px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  
                  <div 
                    className="product-img-wrapper"
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '1.35 / 1',
                      background: 'linear-gradient(180deg, rgba(72, 145, 231, 0.05) 0%, rgba(4, 44, 143, 0.02) 100%)',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255, 255, 255, 0.03)'
                    }}
                  >
                    <button
                      onClick={(e) => toggleFavorite(index, e)}
                      className="fav-btn"
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'rgba(5, 8, 17, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem',
                        zIndex: 3
                      }}
                    >
                      {isFav ? '❤️' : '🤍'}
                    </button>

                    {product.badge && (
                      <span style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '12px',
                        background: `linear-gradient(90deg, ${PALETTE.gargantua} 0%, ${PALETTE.pear} 100%)`,
                        color: '#050811',
                        fontSize: '0.65rem',
                        fontWeight: '800',
                        padding: '4px 10px',
                        borderRadius: '8px',
                        zIndex: 2,
                        letterSpacing: '0.5px'
                      }}>
                        {product.badge.toUpperCase()}
                      </span>
                    )}

                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        style={{
                          maxWidth: '80%',
                          maxHeight: '80%',
                          objectFit: 'contain'
                        }}
                      />
                    ) : (
                      <span style={{ 
                        fontSize: '3.8rem', 
                        userSelect: 'none', 
                        filter: `drop-shadow(0 8px 15px rgba(4, 44, 143, 0.6))` 
                      }}>
                        {product.fallbackIcon}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        color: PALETTE.celestialBlue, 
                        fontWeight: '700', 
                        textTransform: 'uppercase', 
                        letterSpacing: '1px' 
                      }}>
                        {product.category}
                      </span>
                      <span style={{ 
                        fontSize: '0.7rem', 
                        color: PALETTE.morningDew, 
                        background: 'rgba(134, 208, 253, 0.08)', 
                        padding: '3px 10px', 
                        borderRadius: '6px',
                        border: '1px solid rgba(134, 208, 253, 0.15)' 
                      }}>
                        {product.status}
                      </span>
                    </div>

                    <h3 style={{
                      fontSize: '1.05rem',
                      fontWeight: '700',
                      color: '#ffffff',
                      margin: '0 0 12px 0',
                      lineHeight: '1.4',
                      height: '2.8em',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {product.name}
                    </h3>

                    <div style={{ 
                      height: '1px', 
                      background: `linear-gradient(90deg, rgba(134, 208, 253, 0.15) 0%, rgba(255, 255, 255, 0) 100%)`, 
                      margin: '8px 0 16px' 
                    }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {hasDiscount && (
                          <span style={{ fontSize: '0.75rem', textDecoration: 'line-through', color: 'rgba(193, 229, 251, 0.4)', marginBottom: '2px' }}>
                            ${product.originalPrice?.toFixed(2)}
                          </span>
                        )}
                        <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ffffff' }}>
                          ${product.price.toFixed(2)}
                        </span>
                      </div>

                      <button style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        color: PALETTE.pear,
                        border: `1px solid rgba(187, 225, 26, 0.3)`,
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem',
                        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `linear-gradient(135deg, ${PALETTE.pear} 0%, ${PALETTE.gargantua} 100%)`;
                        e.currentTarget.style.color = PALETTE.smalt;
                        e.currentTarget.style.boxShadow = `0 0 12px rgba(187, 225, 26, 0.4)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                        e.currentTarget.style.color = PALETTE.pear;
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      >
                        ＋
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};

export default MusicStoreCatalog;