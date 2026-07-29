'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import Image from "next/image";

type Slide = { key: string; label: string; src: string; alt: string }

type ProjectLite = {
  id: string
  title: string
  subtitle: string
  description: string
  tech: string[]
  slides: Slide[]
  liveUrl?: string
  details: { sections: { title: string; content: string }[]; footer?: string }
}

/* ================== TILE ================== */

function MarqueeTile({ project, onClick }: { project: ProjectLite; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex: '0 0 auto',
        width: 260,
        marginRight: 20,
        borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.03)',
        overflow: 'hidden',
        textAlign: 'left',
        cursor: 'pointer',
      }}
    >
      <div style={{ height: 140, overflow: 'hidden', position: 'relative' }}>
        <Image
          src={project.slides[0]?.src}
          alt={project.slides[0]?.alt}
          fill
          sizes="260px"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div style={{ padding: 14 }}>
        <h4 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
          {project.title}
        </h4>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 8 }}>
          {project.subtitle}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.tech.slice(0, 2).map((t) => (
            <span
              key={t}
              style={{
                fontSize: 10,
                color: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 999,
                padding: '3px 8px',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}

/* ================== MARQUEE ================== */

export default function ProjectMarquee({ projects }: { projects: ProjectLite[] }) {
  const [paused, setPaused] = useState(false)
  const [active, setActive] = useState<ProjectLite | null>(null)
  const loop = [...projects, ...projects] // duplicated for a seamless loop

  return (
    <div style={{ position: 'relative' }}>
      <style jsx>{`
        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 22s linear infinite;
        }
        .marquee-track.paused {
          animation-play-state: paused;
        }
      `}</style>

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? 'Play project carousel' : 'Pause project carousel'}
        style={{
          position: 'absolute',
          top: -44,
          right: 0,
          width: 30,
          height: 30,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.15)',
          background: 'rgba(255,255,255,0.05)',
          color: '#fff',
          fontSize: 12,
          cursor: 'pointer',
        }}
      >
        {paused ? '▶' : 'II'}
      </button>

      <div
        style={{ overflow: 'hidden' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className={`marquee-track${paused ? ' paused' : ''}`}>
          {loop.map((p, i) => (
            <MarqueeTile key={`${p.id}-${i}`} project={p} onClick={() => setActive(p)} />
          ))}
        </div>
      </div>

      {/* ============ DETAIL MODAL ============ */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
            }}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: 640,
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
                borderRadius: 24,
                border: '1px solid rgba(255,255,255,0.1)',
                background: '#0d0d0d',
                padding: 28,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 16,
                }}
              >
                <div>
                  <h3 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 4 }}>
                    {active.title}
                  </h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{active.subtitle}</p>
                </div>
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    border: 'none',
                    background: 'rgba(255,255,255,0.08)',
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              <div
                style={{
                  borderRadius: 14,
                  overflow: 'hidden',
                  marginBottom: 18,
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <Image
                  src={active.slides[0]?.src}
                  alt={active.slides[0]?.alt}
                  width={1200}
                  height={750}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              <p
                style={{
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.75,
                  marginBottom: 18,
                }}
              >
                {active.description}
              </p>

              {active.details.sections.map((s) => (
                <div key={s.title} style={{ marginBottom: 16 }}>
                  <h4
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: '#fff',
                      marginBottom: 6,
                    }}
                  >
                    {s.title}
                  </h4>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                    {s.content}
                  </p>
                </div>
              ))}

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                {active.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 11,
                      color: 'rgba(255,255,255,0.6)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 999,
                      padding: '4px 10px',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {active.liveUrl && (
                <a
                  href={active.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    marginTop: 16,
                    fontSize: 13,
                    color: '#fff',
                  }}
                >
                  Visit Website <ArrowUpRight size={14} />
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}