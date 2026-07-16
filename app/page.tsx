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
      padding: isMobile ? '8px' : '30px 6%',
      position: 'relative'
    }}>
      
      {/* --- AURAS DE LUZ INTENSAS (GRADIENTES VIVOS DE FONDO) --- */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        left: '10%',
        width: isMobile ? '80vw' : '60vw',
        height: isMobile ? '80vw' : '60vw',
        background: `radial-gradient(circle, rgba(72, 145, 231, 0.25) 0%, rgba(4, 44, 143, 0) 70%)`,
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '-10%',
        width: isMobile ? '70vw' : '50vw',
        height: isMobile ? '70vw' : '50vw',
        background: `radial-gradient(circle, rgba(187, 225, 26, 0.18) 0%, rgba(5, 8, 17, 0) 60%)`,
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      {/* --- ESTILOS CON ANIMACIONES INTERACTIVAS DE NEÓN --- */}
      <style>{`
        .grid-overlay {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
        }

        .premium-card {
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        @media (hover: hover) {
          .premium-card:hover {
            transform: translateY(-6px);
            border-color: ${PALETTE.pear} !important;
            box-shadow: 0 15px 40px -10px rgba(187, 225, 26, 0.25), 
                        0 0 12px -3px rgba(187, 225, 26, 0.15);
          }
          .premium-card:hover .product-img-wrapper img {
            transform: scale(1.08) rotate(2deg);
          }
          .fav-btn:hover {
            transform: scale(1.15);
            background-color: rgba(255, 255, 255, 0.2) !important;
            box-shadow: 0 0 10px ${PALETTE.celestialBlue};
          }
          .pill-btn:hover {
            background: rgba(72, 145, 231, 0.1) !important;
            border-color: ${PALETTE.celestialBlue} !important;
            color: ${PALETTE.morningDew} !important;
          }
        }

        .product-img-wrapper img {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fav-btn {
          transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .pill-btn {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sparkle-floating {
          animation: sparkleFloat 6s ease-in-out infinite;
        }
        @keyframes sparkleFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); filter: drop-shadow(0 0 10px ${PALETTE.gargantua}); }
          50% { transform: translateY(-10px) rotate(8deg) scale(1.05); filter: drop-shadow(0 0 20px ${PALETTE.pear}); }
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; filter: drop-shadow(0 0 6px ${PALETTE.pear}); }
        }
        .badge-live {
          animation: pulseGlow 2s infinite;
        }

        /* Ocultar barra de scroll en categorías móviles */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      {/* Contenedor Principal Dashboard */}
      <div 
        className="grid-overlay"
        style={{
          background: 'rgba(7, 12, 25, 0.88)',
          borderRadius: isMobile ? '18px' : '32px',
          border: `1px solid rgba(255, 255, 255, 0.08)`,
          boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.85)',
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >

        {/* --- HEADER --- */}
        <header style={{
          position: 'relative',
          paddingBottom: isMobile ? '30px' : '70px',
          borderBottom: `1px solid rgba(255, 255, 255, 0.05)`,
          overflow: 'hidden',
        }}>
          
          {/* Barra de Navegación */}
          <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: isMobile ? '1.25rem 1rem' : '2rem 5%',
            fontSize: '0.8rem',
            fontWeight: '800',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            position: 'relative',
            zIndex: 2,
            borderBottom: `1px solid rgba(255, 255, 255, 0.03)`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: PALETTE.pear, fontWeight: '900', fontSize: isMobile ? '0.9rem' : '1rem' }}>
              <span style={{ fontSize: '1.1rem', filter: `drop-shadow(0 0 5px ${PALETTE.pear})` }}>⚡</span> SONICLAB
            </div>
            {!isMobile && (
              <div style={{ display: 'flex', gap: '24px' }}>
                <a href="#" style={{ color: '#ffffff', textDecoration: 'none', transition: 'color 0.2s' }}>Equipos</a>
                <a href="#" style={{ color: '#ffffff', textDecoration: 'none', transition: 'color 0.2s' }}>Novedades</a>
                <a href="#" style={{ color: '#ffffff', textDecoration: 'none', transition: 'color 0.2s' }}>Soporte</a>
              </div>
            )}
            <div>
              <span style={{ cursor: 'pointer', fontSize: isMobile ? '1rem' : '1.2rem', padding: isMobile ? '6px 12px' : '8px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)' }}>🛍️</span>
            </div>
          </nav>

          {/* Hero Content */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.3fr 0.7fr',
            padding: isMobile ? '1.5rem 1rem 0' : '4.5rem 5% 0',
            alignItems: 'center',
            gap: isMobile ? '30px' : '0px',
            position: 'relative',
            zIndex: 2
          }}>
            <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
              {/* Badge de Novedad */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: `linear-gradient(90deg, rgba(187, 225, 26, 0.15) 0%, rgba(72, 145, 231, 0.1) 100%)`,
                border: `1px solid rgba(187, 225, 26, 0.3)`,
                padding: '6px 14px',
                borderRadius: '99px',
                fontSize: '0.7rem',
                fontWeight: '700',
                color: PALETTE.gargantua,
                marginBottom: '1.2rem',
                boxShadow: `0 0 15px rgba(187, 225, 26, 0.1)`
              }}>
                <span className="badge-live" style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: PALETTE.pear }} />
                SINTONIZA LO ÚLTIMO EN AUDIO
              </div>

              {/* Título adaptable */}
              <h1 style={{
                fontSize: isMobile ? '1.85rem' : '4rem',
                fontWeight: '900',
                lineHeight: '1.2',
                letterSpacing: '-1px',
                margin: '0 0 1rem 0',
                background: `linear-gradient(135deg, #ffffff 30%, ${PALETTE.celestialBlue} 70%, ${PALETTE.havelock} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Tu tienda de confianza, <br />
                música y accesorios.
              </h1>
              
              <p style={{
                fontSize: isMobile ? '0.85rem' : '1.1rem',
                color: PALETTE.morningDew,
                opacity: 0.85,
                maxWidth: isMobile ? '100%' : '520px',
                lineHeight: '1.6',
                margin: '0 0 1.8rem 0'
              }}>
                Explora el catálogo premium con las texturas y matices que solo los mejores procesadores analógicos y digitales pueden ofrecer.
              </p>

              <button style={{
                background: `linear-gradient(135deg, ${PALETTE.pear} 0%, ${PALETTE.gargantua} 100%)`,
                color: '#042C8F',
                border: 'none',
                padding: isMobile ? '14px 28px' : '16px 32px',
                borderRadius: '12px',
                fontWeight: '800',
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: `0 8px 25px rgba(187, 225, 26, 0.3)`,
                width: isMobile ? '100%' : 'auto',
                justifyContent: 'center'
              }}>
                Explorar Catálogo <span style={{ fontSize: '1.1rem' }}>→</span>
              </button>
            </div>

            {/* Estrellas de Fondo en móviles (más pequeñas) */}
            <div style={{
              position: 'relative',
              height: isMobile ? '100px' : '280px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                position: 'absolute',
                width: isMobile ? '100px' : '180px',
                height: isMobile ? '100px' : '180px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${PALETTE.pear} 0%, rgba(187, 225, 26, 0) 70%)`,
                opacity: 0.25,
                filter: 'blur(10px)',
                zIndex: 0
              }} />

              <svg className="sparkle-floating" width={isMobile ? "70" : "130"} height={isMobile ? "70" : "130"} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', zIndex: 2 }}>
                <path d="M50 0C50 27.6142 27.6142 50 0 50C27.6142 50 50 72.3858 50 100C50 72.3858 72.3858 50 100 50C72.3858 50 50 27.6142 50 0Z" fill="url(#sparkle-grad)" />
                <defs>
                  <linearGradient id="sparkle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="60%" stopColor={PALETTE.gargantua} />
                    <stop offset="100%" stopColor={PALETTE.pear} />
                  </linearGradient>
                </defs>
              </svg>
              
              <svg className="sparkle-floating" width={isMobile ? "30" : "50"} height={isMobile ? "30" : "50"} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', transform: isMobile ? 'translate(40px, -40px)' : 'translate(70px, -70px)', zIndex: 1, opacity: 0.85 }}>
                <path d="M50 0C50 27.6142 27.6142 50 0 50C27.6142 50 50 72.3858 50 100C50 72.3858 72.3858 50 100 50C72.3858 50 50 27.6142 50 0Z" fill={PALETTE.celestialBlue} />
              </svg>
            </div>
          </div>
        </header>

        {/* --- BUSCADOR Y FILTROS --- */}
        <section style={{ padding: isMobile ? '20px 10px 15px' : '40px 5% 30px', position: 'relative', zIndex: 3 }}>
          <div style={{ marginBottom: isMobile ? '20px' : '35px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '650px' }}>
              <input 
                type="text" 
                placeholder="Buscar guitarras, pedales, accesorios..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: isMobile ? '14px 16px 14px 44px' : '18px 24px 18px 58px',
                  borderRadius: '12px',
                  border: `1px solid rgba(134, 208, 253, 0.25)`,
                  background: 'rgba(11, 19, 43, 0.6)',
                  color: '#ffffff',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  outline: 'none',
                  backdropFilter: 'blur(20px)',
                  boxShadow: `0 10px 40px -15px rgba(4, 44, 143, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.1)`,
                  fontFamily: 'inherit',
                  transition: 'all 0.3s'
                }}
              />
              <span style={{
                position: 'absolute',
                left: isMobile ? '16px' : '22px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: isMobile ? '1rem' : '1.25rem',
                color: PALETTE.celestialBlue
              }}>🔍</span>
            </div>
          </div>

          {/* Carrusel Desplazable Horizontal en Móviles */}
          <div 
            className="no-scrollbar"
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '10px',
              margin: isMobile ? '0 -10px' : '0',
              paddingLeft: isMobile ? '10px' : '0',
              paddingRight: isMobile ? '10px' : '0',
              justifyContent: isMobile ? 'flex-start' : 'center',
              WebkitOverflowScrolling: 'touch'
            }}
          >
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
                    padding: isMobile ? '8px 18px' : '10px 24px',
                    borderRadius: '99px',
                    fontWeight: '700',
                    fontSize: isMobile ? '0.75rem' : '0.85rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    boxShadow: isActive ? `0 4px 15px rgba(187, 225, 26, 0.3)` : 'none',
                  }}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* --- CATÁLOGO --- */}
        <section style={{ padding: isMobile ? '15px 10px 40px' : '20px 5% 70px' }}>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: isMobile ? '20px' : '40px'
          }}>
            <h3 style={{
              fontSize: isMobile ? '1.15rem' : '1.5rem',
              fontWeight: '800',
              margin: 0,
              background: `linear-gradient(90deg, #ffffff 0%, ${PALETTE.morningDew} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Línea de Equipamiento
            </h3>
            <span style={{ fontSize: isMobile ? '0.7rem' : '0.85rem', color: PALETTE.celestialBlue, fontWeight: '600' }}>
              {filteredProducts.length} DISPONIBLES
            </span>
          </div>

          {/* Grid Responsiva adaptable a móviles */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '16px' : '28px',
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
                    borderRadius: '20px',
                    padding: isMobile ? '16px' : '22px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  
                  <div 
                    className="product-img-wrapper"
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '1.4 / 1',
                      background: 'linear-gradient(180deg, rgba(72, 145, 231, 0.05) 0%, rgba(4, 44, 143, 0.02) 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255, 255, 255, 0.03)'
                    }}
                  >
                    <button
                      onClick={(e) => toggleFavorite(index, e)}
                      className="fav-btn"
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(5, 8, 17, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        zIndex: 3
                      }}
                    >
                      {isFav ? '❤️' : '🤍'}
                    </button>

                    {product.badge && (
                      <span style={{
                        position: 'absolute',
                        bottom: '8px',
                        left: '8px',
                        background: `linear-gradient(90deg, ${PALETTE.gargantua} 0%, ${PALETTE.pear} 100%)`,
                        color: '#050811',
                        fontSize: '0.6rem',
                        fontWeight: '800',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        zIndex: 2,
                      }}>
                        {product.badge.toUpperCase()}
                      </span>
                    )}

                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        style={{
                          maxWidth: '75%',
                          maxHeight: '75%',
                          objectFit: 'contain'
                        }}
                      />
                    ) : (
                      <span style={{ 
                        fontSize: isMobile ? '2.8rem' : '3.8rem', 
                        userSelect: 'none', 
                        filter: `drop-shadow(0 8px 15px rgba(4, 44, 143, 0.6))` 
                      }}>
                        {product.fallbackIcon}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ 
                        fontSize: '0.7rem', 
                        color: PALETTE.celestialBlue, 
                        fontWeight: '700', 
                        textTransform: 'uppercase', 
                      }}>
                        {product.category}
                      </span>
                      <span style={{ 
                        fontSize: '0.65rem', 
                        color: PALETTE.morningDew, 
                        background: 'rgba(134, 208, 253, 0.08)', 
                        padding: '2px 8px', 
                        borderRadius: '4px',
                        border: '1px solid rgba(134, 208, 253, 0.15)' 
                      }}>
                        {product.status}
                      </span>
                    </div>

                    <h3 style={{
                      fontSize: '0.95rem',
                      fontWeight: '700',
                      color: '#ffffff',
                      margin: '0 0 10px 0',
                      lineHeight: '1.35',
                      height: '2.7em',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {product.name}
                    </h3>

                    <div style={{ 
                      height: '1px', 
                      background: `linear-gradient(90deg, rgba(134, 208, 253, 0.1) 0%, rgba(255, 255, 255, 0) 100%)`, 
                      margin: '6px 0 12px' 
                    }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {hasDiscount && (
                          <span style={{ fontSize: '0.7rem', textDecoration: 'line-through', color: 'rgba(193, 229, 251, 0.4)', marginBottom: '1px' }}>
                            ${product.originalPrice?.toFixed(2)}
                          </span>
                        )}
                        <span style={{ fontSize: '1.15rem', fontWeight: '800', color: '#ffffff' }}>
                          ${product.price.toFixed(2)}
                        </span>
                      </div>

                      <button style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        color: PALETTE.pear,
                        border: `1px solid rgba(187, 225, 26, 0.3)`,
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem',
                        transition: 'all 0.2s',
                      }}>
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