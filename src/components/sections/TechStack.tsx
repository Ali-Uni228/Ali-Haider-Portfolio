'use client'

import { motion } from 'framer-motion'

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

const groups = [
  { title: 'Languages', items: ['Python', 'C++', 'JavaScript', 'HTML / CSS'] },
  { title: 'AI & Automation', items: ['Ollama', 'Whisper', 'Playwright', 'Piper TTS', 'Win32 API'] },
  { title: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'SQLite', 'TCP RCON'] },
  { title: 'Frontend & Graphics', items: ['Three.js', 'WebGL', 'SFML'] },
]

export default function TechStack() {
  return (
    <section
      id="stack"
      className="w-full max-w-[1500px] mx-auto px-5 sm:px-6 md:px-10 lg:px-20 pt-16 pb-16 text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: smoothEase }}
        style={{ marginBottom: 32 }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            color: 'var(--text-muted)',
            letterSpacing: '0.2em',
          }}
        >
          TECHNOLOGIES
        </span>
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 800,
            marginTop: 10,
            color: 'var(--text-primary)',
          }}
        >
          Tools I Enjoy Building With
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: smoothEase }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 24,
        }}
      >
        {groups.map((g) => (
          <div
            key={g.title}
            style={{
              border: '1px solid var(--border)',
              borderRadius: 20,
              padding: 20,
              background: 'var(--bg-card)',
            }}
          >
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                marginBottom: 14,
                textTransform: 'uppercase',
              }}
            >
              {g.title}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {g.items.map((item) => (
                <span
                  key={item}
                  style={{
                    fontSize: 12,
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: 999,
                    padding: '5px 12px',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
