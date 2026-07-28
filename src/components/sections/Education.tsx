'use client'

import { motion } from 'framer-motion'

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

const focusItems = [
  'Building JARVIS as my long-term AI assistant project.',
  'Learning backend development and software architecture.',
  'Looking for my first software engineering internship.',
  'Getting better at debugging systems instead of memorizing solutions.',
]

const topics = ['Artificial Intelligence Systems', 'Backend Development', 'Machine Learning', 'Software Automation']

export default function Education() {
  return (
    <section
      id="education"
      className="w-full max-w-[900px] mx-auto px-5 sm:px-6 md:px-10 pt-16 pb-20 text-white"
    >
      {/* CURRENT FOCUS */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: smoothEase }}
        style={{ marginBottom: 56 }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            color: 'var(--text-muted)',
            letterSpacing: '0.2em',
          }}
        >
          CURRENT FOCUS
        </span>

        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {focusItems.map((item, i) => (
            <p key={item} style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--text-primary)' }}>{String(i + 1).padStart(2, '0')}.</strong> {item}
            </p>
          ))}
        </div>
      </motion.div>

      {/* EDUCATION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: smoothEase }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            color: 'var(--text-muted)',
            letterSpacing: '0.2em',
          }}
        >
          EDUCATION
        </span>

        <h3 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, marginTop: 14, marginBottom: 4 }}>
          BS Artificial Intelligence
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 14 }}>
          Air University &bull; Islamabad, Pakistan
        </p>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
          Second Semester Undergraduate Student.
        </p>

        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10, letterSpacing: '0.05em' }}>
          Areas I&apos;m currently exploring:
        </p>
        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 10, listStyle: 'none', padding: 0, marginBottom: 22 }}>
          {topics.map((t) => (
            <li
              key={t}
              style={{
                fontSize: 12,
                color: 'var(--text-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 999,
                padding: '6px 14px',
              }}
            >
              {t}
            </li>
          ))}
        </ul>

        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.75, fontStyle: 'italic' }}>
          Most of my learning happens outside the classroom through building projects, breaking them repeatedly, and
          figuring out why they failed.
        </p>
      </motion.div>
    </section>
  )
}
