'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Moon, Sun, User, Calendar } from 'lucide-react';

// Sample project data from JS array
const PROJECTS = [
  {
    id: 1,
    title: 'Distributed Sensor Network for Urban Monitoring',
    description: 'A comprehensive study on deploying low-cost environmental sensors across metropolitan areas to monitor air quality and noise pollution in real-time.',
    author: 'Dr. Elena Rossi',
    date: 'Oct 12, 2023',
    tags: ['Research', 'IoT', 'Sustainability'],
    image: 'https://picsum.photos/seed/p1/400/300'
  },
  {
    id: 2,
    title: 'RaDiCe WMS: Core Architecture Redesign',
    description: 'The second phase of the Warehouse Management System focuses on optimizing query performance and implementing a more robust state machine for inventory tracking.',
    author: 'Marco Silva',
    date: 'Sep 28, 2023',
    tags: ['Development', 'Database'],
    image: 'https://picsum.photos/seed/p2/400/300'
  },
  {
    id: 3,
    title: 'Machine Learning in Logistics Optimization',
    description: 'Exploring the application of genetic algorithms to solve complex routing problems within dynamic warehouse environments, reducing throughput times by 15%.',
    author: 'Sarah Chen',
    date: 'Aug 15, 2023',
    tags: ['AI', 'Logistics'],
    image: 'https://picsum.photos/seed/p3/400/300'
  },
  {
    id: 4,
    title: 'User Interface Guidelines for Industrial Applications',
    description: 'Establishing a common design language for all RaDiCe-related tools, prioritizing accessibility and ease of use in diverse lighting conditions.',
    author: 'Pietro Valli',
    date: 'Jul 22, 2023',
    tags: ['Design', 'UI/UX'],
    image: 'https://picsum.photos/seed/p4/400/300'
  }
];

export default function LandingPage() {
  const [isDark, setIsDark] = useState(false);
  const [search, setSearch] = useState('');
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('radice-theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
    }
  }, []);

  const filteredProjects = useMemo(() => {
    const q = search.toLowerCase();
    return PROJECTS.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [search]);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      localStorage.setItem('radice-theme', isDark ? 'dark' : 'light');
    }
  }, [isDark, mounted]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen">
      <style jsx global>{`
        :root {
          /* 60/30/10 Color System */
          --color-surface: #ffffff;
          --color-ink: #111111;
          --color-muted: #6b6b6b;
          --color-line: #e8e8e8;
          --color-soft: #f5f5f5;
          --color-chip: #f0f0f0;
          
          /* Token-based spacing scale */
          --space-1: 4px;
          --space-2: 8px;
          --space-3: 12px;
          --space-4: 16px;
          --space-5: 24px;
          --space-6: 32px;
          --space-7: 48px;
          --space-8: 64px;
          
          --radius-card: 14px;
          
          --nav-height: 64px;
          --container-max: 1120px;
        }

        [data-theme="dark"] {
          --color-surface: #111111;
          --color-ink: #ffffff;
          --color-muted: #a0a0a0;
          --color-line: #333333;
          --color-soft: #1a1a1a;
          --color-chip: #2a2a2a;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: 'Open Sans', 'Segoe UI', Tahoma, sans-serif;
          background-color: var(--color-surface);
          color: var(--color-ink);
          line-height: 1.5;
          font-size: 15px;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .container-custom {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--space-4);
        }

        .logo-img {
          height: 40px;
          width: auto;
          display: block;
          transition: filter 0.3s ease;
        }

        [data-theme="dark"] .logo-img {
          filter: invert(1) brightness(1.1);
        }

        .hero-title {
          font-size: clamp(32px, 5vw, 42px);
          line-height: 1.15;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .search-input-custom {
          width: 100%;
          padding: 14px 14px 14px 48px;
          border-radius: 12px;
          border: 1px solid var(--color-line);
          background: var(--color-soft);
          color: var(--color-ink);
          font-size: 16px;
          outline: none;
          transition: all 0.2s;
        }

        .search-input-custom:focus {
          border-color: var(--color-ink);
          background: var(--color-surface);
          box-shadow: 0 0 0 4px rgba(17,17,17, 0.03);
        }

        .card-description-custom {
          font-family: 'Times New Roman', Times, serif;
          font-size: 15px;
          line-height: 1.6;
          color: var(--color-muted);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin: 4px 0;
        }

        .nav-btn {
          cursor: pointer;
          border: none;
          border-radius: 6px;
          padding: var(--space-2) var(--space-4);
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .nav-btn-ghost {
          background: transparent;
          color: var(--color-ink);
        }
        .nav-btn-ghost:hover {
          background: var(--color-soft);
        }

        .nav-btn-primary {
          background: var(--color-ink);
          color: var(--color-surface);
        }
        .nav-btn-primary:hover {
          opacity: 0.9;
        }

        .theme-button {
          background: transparent;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-ink);
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .theme-button:hover {
          background: var(--color-soft);
        }

        .pill-tag {
          background: var(--color-chip);
          padding: 2px 10px;
          border-radius: 100px;
          font-size: 11px;
          color: var(--color-muted);
          font-weight: 600;
          text-transform: uppercase;
        }
      `}</style>

      {/* Navbar (Sticky top) */}
      <nav className="sticky top-0 z-[1000] h-[var(--nav-height)] bg-[var(--color-surface)] border-b border-[var(--color-line)] flex items-center">
        <div className="container-custom flex justify-between items-center w-full">
          <div className="logo-section">
            <img 
              src="/logo.png" 
              alt="RaDiCe WMS" 
              className="logo-img" 
              onError={(e) => {
                // Fallback text logo if file doesn't exist
                const p = e.currentTarget.parentElement;
                if (p) {
                  p.innerHTML = '<span style="font-weight: 700; font-size: 20px; letter-spacing: -0.5px;">RaDiCe WMS</span>';
                }
              }}
            />
          </div>
          <div className="flex items-center gap-[var(--space-3)]">
            <button className="hidden sm:inline-flex nav-btn nav-btn-ghost">Log in</button>
            <button className="nav-btn nav-btn-primary">Sign up</button>
            <button 
              className="theme-button" 
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      <main className="container-custom">
        {/* Hero Section (Centered) */}
        <section className="py-[var(--space-8)] text-center flex flex-col items-center">
          <h1 className="hero-title mb-[var(--space-3)]">RaDiCe Repository</h1>
          <p className="text-[var(--color-muted)] mb-[var(--space-6)]">
            Discover projects and researches within RaDiCe.
          </p>
          <div className="relative w-full max-w-[640px]">
            <Search className="absolute left-[var(--space-4)] top-1/2 -translate-y-1/2 text-[var(--color-muted)] pointer-events-none" size={20} />
            <input 
              type="text" 
              className="search-input-custom" 
              placeholder="Search projects, research, or authors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </section>

        {/* Projects Section */}
        <section className="pb-[var(--space-8)]">
          <div className="flex justify-between items-baseline mb-[var(--space-4)] border-b border-[var(--color-line)] pb-[var(--space-2)]">
            <h2 className="text-[20px] font-bold">Latest Projects</h2>
            <div className="text-[13px] text-[var(--color-muted)]">
              {filteredProjects.length} item{filteredProjects.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-[var(--space-3)]">
            {filteredProjects.map((p) => (
              <div 
                key={p.id}
                className="grid grid-cols-1 md:grid-cols-[220px_1fr] bg-[var(--color-surface)] border border-[var(--color-line)] rounded-[14px] p-[var(--space-3)] gap-[var(--space-4)] overflow-hidden transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:border-[var(--color-ink)] hover:shadow-md"
              >
                <div className="w-full md:w-[220px] h-[120px] overflow-hidden rounded-[8px]">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover block" />
                </div>
                <div className="p-0 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap gap-[var(--space-2)] mb-[var(--space-1)]">
                      {p.tags.map(tag => (
                        <span key={tag} className="pill-tag">{tag}</span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold leading-[1.3]">
                      {p.title}
                    </h3>
                    <p className="card-description-custom">
                      {p.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-[var(--space-4)] pt-[var(--space-2)] border-t border-[var(--color-line)] text-[13px] text-[var(--color-muted)]">
                    <span className="flex items-center gap-1">
                      <User size={14} className="text-[var(--color-muted)]" />
                      {p.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} className="text-[var(--color-muted)]" />
                      {p.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {filteredProjects.length === 0 && (
              <div className="py-20 text-center text-[var(--color-muted)]">
                No results found for "{search}"
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
