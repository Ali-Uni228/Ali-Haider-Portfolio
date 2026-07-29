'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ExternalLink, ChevronDown, ChevronUp, X } from 'lucide-react'
import ProjectMarquee from './ProjectMarquee'
import Image from "next/image";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: smoothEase } },
}

/* ================== TYPES ================== */

type Slide = { key: string; label: string; src: string; alt: string; pins?: { top: string; left: string; text: string }[] }

type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  category: 'flagship' | 'learning'
  status?: string
  statusColor?: string
  liveUrl?: string
  tech: string[]
  slides: Slide[]
  diagram?: 'jarvis' | 'deathleade'
  details: {
    sections: { title: string; content: string }[]
    footer?: string
  }
}

/* ================== PROJECT DATA ================== */

const PROJECTS: Project[] = [
  {
    id: 'jarvis',
    title: 'JARVIS',
    subtitle: 'Local-First AI Desktop Assistant',
    description:
      'A local-first AI assistant built to automate real computer systems. Uses deterministic routing to execute simple commands instantly without requiring language model inference.',
    category: 'flagship',
    status: 'Under active development',
    statusColor: '#FF8A45',
    tech: ['Python', 'PyQt6', 'Whisper', 'SQLite', 'Playwright', 'Ollama', 'Piper TTS', 'Win32 API'],
    slides: [
      { key: 'jarvis-brain', label: 'Ask About WoW', src: '/assets/ali/projects/jarvis/jarvis-brain.png', alt: 'JARVIS brain routing', pins: [
        { top: '38%', left: '24%', text: 'Router decides whether AI is even needed.' },
        { top: '66%', left: '64%', text: 'Local language model handles reasoning only when required.' },
      ] },
      { key: 'jarvis-netsearch', label: 'Search Neural Networks', src: '/assets/ali/projects/jarvis/jarvis-netsearch.png', alt: 'JARVIS browser automation' },
      { key: 'jarvis-notepad', label: 'Open Notepad', src: '/assets/ali/projects/jarvis/jarvis-notepad.png', alt: 'JARVIS launching Notepad' },
    ],
    diagram: 'jarvis',
    details: {
      sections: [
        {
          title: 'Why I Built It',
          content:
            'Most AI assistants try to solve every problem by sending everything through a language model. Opening a browser tab or launching an application shouldn\'t take seconds of inference time. JARVIS was built around a simple idea: use AI only when AI is actually needed.',
        },
        {
          title: 'The Problem',
          content:
            'Early versions were slow, unpredictable and occasionally read their own reasoning process aloud through the text-to-speech pipeline. That forced me to redesign how requests are routed, separating simple system actions from complex reasoning tasks.',
        },
        {
          title: 'What It Taught Me',
          content:
            'Building JARVIS taught me that AI products are often software engineering problems before they\'re machine learning problems. Architecture decisions, latency, threading and good UX matter just as much as model selection.',
        },
      ],
      footer: 'Currently Building: Improving browser automation, multi-step task execution, and local AI capabilities.',
    },
  },
  {
    id: 'deathleade',
    title: 'DeathLeade Network',
    subtitle: 'Automated Game Server Commerce Platform',
    description:
      'A Minecraft gaming network storefront designed to automate the complete purchasing experience. Players purchase in-game ranks through the website and receive rewards automatically via TCP RCON.',
    category: 'flagship',
    status: 'Frontend deployed · Backend currently offline',
    statusColor: '#34C98E',
    liveUrl: 'https://deathleade-store.netlify.app/',
    tech: ['Node.js', 'Express', 'MongoDB', 'TCP RCON', 'Railway', 'REST APIs', 'Discord Webhooks'],
    slides: [
      { key: 'deathleade-home', label: 'Homepage', src: '/assets/ali/projects/deathleade/deathleade-home.png', alt: 'DeathLeade landing page' },
      { key: 'deathleade-store', label: 'Store', src: '/assets/ali/projects/deathleade/deathleade-store.png', alt: 'DeathLeade store' },
      { key: 'deathleade-checkout', label: 'Checkout', src: '/assets/ali/projects/deathleade/deathleade-checkout.png', alt: 'DeathLeade checkout', pins: [
        { top: '35%', left: '25%', text: 'Orders are processed automatically.' },
      ] },
      { key: 'deathleade-ordertracking', label: 'Order Tracking', src: '/assets/ali/projects/deathleade/deathleade-ordertracking.png', alt: 'DeathLeade order tracking', pins: [
        { top: '70%', left: '65%', text: 'Packages are delivered in seconds via RCON.' },
      ] },
    ],
    diagram: 'deathleade',
    details: {
      sections: [
        {
          title: 'What I Built',
          content:
            'DeathLeade Network is a Minecraft gaming network storefront that was designed to automate the complete purchasing experience. The backend was built to validate purchases, store order data, communicate with the Minecraft server, and automate package delivery through TCP RCON.',
        },
        {
          title: 'The Challenge',
          content:
            'Building a game commerce platform is more than building a website. Payment processing, database consistency, real-time server communication, and automated delivery systems must work together reliably. Hosting limitations forced me to redesign the backend architecture.',
        },
        {
          title: 'What I Learned',
          content:
            'This project introduced me to production-level problems that most student projects never encounter. I learned how hosting providers affect application architecture, how backend services should be designed independently from the frontend, and how systems behave when real users interact simultaneously.',
        },
      ],
      footer: 'Status: Frontend deployed. Backend deployment is currently paused due to hosting costs.',
    },
  },
  {
    id: 'nova',
    title: 'NOVA AI Assistant',
    subtitle: 'Terminal-Based AI Assistant',
    description:
      'My first attempt at building an AI assistant in Python. NOVA is a terminal-based assistant powered by a locally running language model. Building it taught me how AI assistants process prompts, route commands, and where simple architectures begin to break down.',
    category: 'learning',
    tech: ['Python', 'Ollama', 'Local LLM', 'Prompt Processing'],
    slides: [
      { key: 'nova-terminal', label: 'Terminal', src: '/assets/ali/projects/nova/nova-terminal.png', alt: 'NOVA AI terminal interface' },
    ],
    details: {
      sections: [
        {
          title: 'What It Taught Me',
          content:
            'NOVA was my first real experience with building an AI-powered tool. It taught me how prompt engineering works in practice, how to handle conversation context, and the limitations of simple request-response architectures. Many of the lessons learned building NOVA later influenced the design decisions behind JARVIS.',
        },
      ],
    },
  },
  {
    id: 'solar',
    title: 'Solar System Explorer',
    subtitle: 'Interactive 3D Space Education App',
    description:
      'An educational web application that explores our solar system through interactive 3D visualizations and scientific content. The project combines real-world space exploration topics with browser-based rendering.',
    category: 'learning',
    liveUrl: 'https://solar-system-explorer-rho.vercel.app/',
    tech: ['JavaScript', 'Three.js', 'WebGL', '3D Rendering'],
    slides: [
      { key: 'solar-home', label: 'Home', src: '/assets/ali/projects/solar/solar-home.png', alt: 'Solar Explorer home' },
      { key: 'solar-planets', label: 'Planets', src: '/assets/ali/projects/solar/solar-planets.png', alt: 'Solar Explorer planets' },
      { key: 'solar-missions', label: 'Missions', src: '/assets/ali/projects/solar/solar-missions.png', alt: 'Solar Explorer missions' },
      { key: 'solar-discoveries', label: 'Discoveries', src: '/assets/ali/projects/solar/solar-discoveries.png', alt: 'Solar Explorer discoveries' },
      { key: 'solar-gallery', label: 'Gallery', src: '/assets/ali/projects/solar/solar-gallery.png', alt: 'Solar Explorer gallery' },
      { key: 'solar-compare', label: 'Compare', src: '/assets/ali/projects/solar/solar-compare.png', alt: 'Solar Explorer compare' },
    ],
    details: {
      sections: [
        {
          title: 'What It Taught Me',
          content:
            'This project was my first deep dive into Three.js and WebGL. I learned how to render 3D objects in the browser, manage camera controls, and combine scientific data with interactive visualizations to create an engaging educational experience.',
        },
      ],
    },
  },
  {
    id: 'tetrius',
    title: 'Tetrius',
    subtitle: 'Classic Tetris Clone in C++',
    description:
      'A Tetris clone built from scratch in C++ using SFML. The project taught me how game loops, collision detection, matrix rotations, difficulty scaling, and object-oriented programming come together to create an interactive game experience.',
    category: 'learning',
    tech: ['C++', 'SFML', 'Game Programming', 'OOP'],
    slides: [
      { key: 'tetrius-menu', label: 'Menu', src: '/assets/ali/projects/tetrius/tetrius-menu.png', alt: 'Tetrius menu screen' },
      { key: 'tetrius-levels', label: 'Levels', src: '/assets/ali/projects/tetrius/tetrius-levels.png', alt: 'Tetrius level selection' },
      { key: 'tetrius-gameplay', label: 'Gameplay', src: '/assets/ali/projects/tetrius/tetrius-gameplay.png', alt: 'Tetrius gameplay' },
    ],
    details: {
      sections: [
        {
          title: 'What It Taught Me',
          content:
            'Building Tetrius taught me the fundamentals of game development — game loops, frame-rate independent updates, collision detection with matrix math, and how to structure a larger C++ project with clean OOP principles. It was my first experience creating something interactive and visually rewarding from scratch.',
        },
      ],
    },
  },
  {
    id: 'parking',
    title: 'Smart Parking Management System',
    subtitle: 'Console-Based C++ Application',
    description:
      'A console-based parking management system built in C++. It allows users to allocate parking spaces, search vehicle records, and manage parking slot availability while using file handling techniques to store and retrieve data.',
    category: 'learning',
    tech: ['C++', 'File Handling', 'Data Structures', 'OOP'],
    slides: [
      { key: 'parking-allocation', label: 'Parking Allocation', src: '/assets/ali/projects/parking/parking-allocation.png', alt: 'Parking allocation screen' },
      { key: 'parking-search', label: 'Vehicle Search', src: '/assets/ali/projects/parking/parking-search.png', alt: 'Vehicle search screen' },
      { key: 'parking-slots', label: 'Parking Slots', src: '/assets/ali/projects/parking/parking-slots.png', alt: 'Parking slots view' },
    ],
    details: {
      sections: [
        {
          title: 'What It Taught Me',
          content:
            'This was one of my earliest programming projects. It taught me the fundamentals of file I/O in C++, how to design data structures for real-world problems, and how to build a complete CRUD application with persistent storage — all without any framework or database.',
        },
      ],
    },
  },
]

export const PROJECT_COUNT = PROJECTS.length

/* ================== INSPECT PIN ================== */

function Pin({ top, left, color, text }: { top: string; left: string; color: string; text: string }) {
  const [active, setActive] = useState(false)

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        setActive((v) => !v)
      }}
      onBlur={() => setActive(false)}
      aria-label={text}
      style={{
        position: 'absolute',
        top,
        left,
        width: 14,
        height: 14,
        borderRadius: '50%',
        border: 'none',
        background: color,
        boxShadow: `0 0 0 4px ${color}33`,
        cursor: 'pointer',
        padding: 0,
      }}
    >
      <span
        style={{
          position: 'absolute',
          bottom: 22,
          left: '50%',
          transform: `translateX(-50%) scale(${active ? 1 : 0.9})`,
          opacity: active ? 1 : 0,
          pointerEvents: 'none',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
          width: 200,
          fontSize: 11,
          lineHeight: 1.5,
          background: 'rgba(10,10,10,0.95)',
          border: `1px solid ${color}55`,
          borderRadius: 8,
          padding: '8px 10px',
          color: '#fff',
        }}
      >
        {text}
      </span>
    </button>
  )
}

/* ================== ARCHITECTURE DIAGRAMS ================== */

function JarvisDiagram({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 640 260" style={{ width: '100%', height: 'auto' }} role="img" aria-label="JARVIS Architecture Diagram">
      <rect x="16" y="104" width="120" height="48" rx="4" fill="none" stroke="rgba(255,255,255,0.15)" />
      <text x="76" y="132" fontSize="11" textAnchor="middle" fill="rgba(255,255,255,0.5)">Voice / Text Input</text>
      <path d="M136,128 L182,128" stroke="rgba(255,255,255,0.15)" fill="none" />
      <rect x="184" y="94" width="140" height="68" rx="4" fill="none" stroke={color} />
      <text x="254" y="122" fontSize="11" textAnchor="middle" fill={color}>Deterministic Router</text>
      <text x="254" y="138" fontSize="11" textAnchor="middle" fill={color}>SQLite Lookup</text>
      <path d="M324,112 L392,46" stroke="rgba(255,255,255,0.15)" fill="none" />
      <path d="M324,128 L392,128" stroke="rgba(255,255,255,0.15)" fill="none" />
      <path d="M324,144 L392,210" stroke="rgba(255,255,255,0.15)" fill="none" />
      <rect x="394" y="16" width="220" height="48" rx="4" fill="none" stroke="rgba(255,255,255,0.15)" />
      <text x="504" y="44" fontSize="11" textAnchor="middle" fill="rgba(255,255,255,0.5)">Win32 API</text>
      <rect x="394" y="104" width="220" height="48" rx="4" fill="none" stroke="rgba(255,255,255,0.15)" />
      <text x="504" y="132" fontSize="11" textAnchor="middle" fill="rgba(255,255,255,0.5)">Playwright Automation</text>
      <rect x="394" y="186" width="220" height="48" rx="4" fill="none" stroke="rgba(255,255,255,0.15)" />
      <text x="504" y="214" fontSize="11" textAnchor="middle" fill="rgba(255,255,255,0.5)">Ollama + Qwen2.5 7B</text>
    </svg>
  )
}

function DeathleadeDiagram({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 640 260" style={{ width: '100%', height: 'auto' }} role="img" aria-label="DeathLeade Network Architecture Diagram">
      <rect x="16" y="104" width="120" height="48" rx="4" fill="none" stroke="rgba(255,255,255,0.15)" />
      <text x="76" y="132" fontSize="11" textAnchor="middle" fill="rgba(255,255,255,0.5)">Customer Browser</text>
      <path d="M136,128 L182,128" stroke="rgba(255,255,255,0.15)" fill="none" />
      <rect x="184" y="104" width="120" height="48" rx="4" fill="none" stroke="rgba(255,255,255,0.15)" />
      <text x="244" y="132" fontSize="11" textAnchor="middle" fill="rgba(255,255,255,0.5)">Frontend</text>
      <path d="M304,128 L352,128" stroke="rgba(255,255,255,0.15)" fill="none" />
      <rect x="354" y="104" width="140" height="48" rx="4" fill="none" stroke={color} />
      <text x="424" y="132" fontSize="11" textAnchor="middle" fill={color}>Express API</text>
      <path d="M494,112 L560,46" stroke="rgba(255,255,255,0.15)" fill="none" />
      <path d="M494,128 L560,128" stroke="rgba(255,255,255,0.15)" fill="none" />
      <path d="M494,144 L560,210" stroke="rgba(255,255,255,0.15)" fill="none" />
      <rect x="562" y="16" width="70" height="48" rx="4" fill="none" stroke="rgba(255,255,255,0.15)" />
      <text x="597" y="36" fontSize="10" textAnchor="middle" fill="rgba(255,255,255,0.5)">MongoDB</text>
      <text x="597" y="50" fontSize="10" textAnchor="middle" fill="rgba(255,255,255,0.5)">Database</text>
      <rect x="562" y="104" width="70" height="48" rx="4" fill="none" stroke="rgba(255,255,255,0.15)" />
      <text x="597" y="124" fontSize="10" textAnchor="middle" fill="rgba(255,255,255,0.5)">Discord</text>
      <text x="597" y="138" fontSize="10" textAnchor="middle" fill="rgba(255,255,255,0.5)">Logs</text>
      <rect x="562" y="186" width="70" height="48" rx="4" fill="none" stroke="rgba(255,255,255,0.15)" />
      <text x="597" y="206" fontSize="10" textAnchor="middle" fill="rgba(255,255,255,0.5)">TCP RCON</text>
      <text x="597" y="220" fontSize="10" textAnchor="middle" fill="rgba(255,255,255,0.5)">Delivery</text>
    </svg>
  )
}

/* ================== SCREENSHOT SWITCHER ================== */

function Switcher({ slides, color }: { slides: Slide[]; color: string }) {
  const [active, setActive] = useState(0) 
  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length)
    }, 2300)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div>
      {slides.length > 1 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
          {slides.map((s, i) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setActive(i)}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                padding: '5px 10px',
                borderRadius: 999,
                border: `1px solid ${i === active ? color : 'rgba(255,255,255,0.1)'}`,
                background: i === active ? `${color}1a` : 'transparent',
                color: i === active ? '#fff' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              [{s.label}]
            </button>
          ))}
        </div>
      )}

      <div
        style={{
          position: 'relative',
          width: '100%',
          borderRadius: 12,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        <Image
          src={slides[active].src}
          alt={slides[active].alt}
          width={1200}
          height={750}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        {slides[active].pins?.map((p, i) => (
          <Pin key={i} top={p.top} left={p.left} color={color} text={p.text} />
        ))}
      </div>
    </div>
  )
}

/* ================== TECH STACK PILLS ================== */

function TechPills({ items, color }: { items: string[]; color: string }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {items.map((t) => (
        <span
          key={t}
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 999,
            padding: '4px 10px',
            background: 'rgba(255,255,255,0.03)',
          }}
        >
          {t}
        </span>
      ))}
    </div>
  )
}

/* ================== PROJECT CARD (EXPANDABLE) ================== */

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const color = project.statusColor || (project.category === 'flagship' ? '#FF8A45' : '#888')

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.1 }}
      style={{ marginBottom: 0 }}
    >
      <div
        style={{
          borderRadius: 22,
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.025)',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
          transition: 'border-color 0.3s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${color}44`)}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
      >
        {/* CARD HEADER */}
        <div style={{ padding: 'clamp(16px, 3vw, 28px)' }}>
          {/* Top row: number + category badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: color,
                letterSpacing: '0.15em',
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                color: project.category === 'flagship' ? color : 'rgba(255,255,255,0.4)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '3px 10px',
                borderRadius: 999,
                border: `1px solid ${project.category === 'flagship' ? `${color}44` : 'rgba(255,255,255,0.08)'}`,
                background: project.category === 'flagship' ? `${color}11` : 'transparent',
              }}
            >
              {project.category === 'flagship' ? '★ Flagship' : 'Built While Learning'}
            </span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              fontWeight: 800,
              color: '#fff',
              marginBottom: 4,
              letterSpacing: '-0.02em',
            }}
          >
            {project.title}
          </h3>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 12 }}>
            {project.subtitle}
          </p>

          {/* Status + live link */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            {project.status && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: color,
                  border: `1px solid ${color}44`,
                  borderRadius: 999,
                  padding: '3px 10px',
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: color }} />
                {project.status}
              </span>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 12,
                  color: color,
                  textDecoration: 'underline',
                  textUnderlineOffset: 3,
                }}
              >
                Visit Website <ArrowUpRight size={12} />
              </a>
            )}
          </div>

          {/* Description */}
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 16, maxWidth: 700 }}>
            {project.description}
          </p>

          {/* Screenshot Switcher */}
          <div style={{ marginBottom: 16 }}>
            <Switcher slides={project.slides} color={color} />
          </div>

          {/* Tech stack */}
          <TechPills items={project.tech} color={color} />
        </div>

        {/* EXPAND/COLLAPSE BUTTON */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            width: '100%',
            padding: '12px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.02)',
            color: 'rgba(255,255,255,0.45)',
            fontSize: 11,
            fontFamily: "'DM Mono', monospace",
            cursor: 'pointer',
            border: 'none',
            borderBottomLeftRadius: expanded ? 0 : 22,
            borderBottomRightRadius: expanded ? 0 : 22,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {expanded ? 'Show Less' : 'Read More'}
        </button>

        {/* EXPANDED DETAILS */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: smoothEase }}
              style={{ overflow: 'hidden' }}
            >
              <div
                style={{
                  padding: 'clamp(16px, 3vw, 28px)',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: 24,
                    marginBottom: project.details.footer ? 20 : 0,
                  }}
                >
                  {project.details.sections.map((s) => (
                    <div key={s.title}>
                      <h4
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: '#fff',
                          marginBottom: 8,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {s.title}
                      </h4>
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>
                        {s.content}
                      </p>
                    </div>
                  ))}
                  {project.diagram && (
                    <div>
                      <h4
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: '#fff',
                          marginBottom: 8,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {project.diagram === 'jarvis' ? 'How Requests Are Routed' : 'Architecture Overview'}
                      </h4>
                      {project.diagram === 'jarvis' ? (
                        <JarvisDiagram color={color} />
                      ) : (
                        <DeathleadeDiagram color={color} />
                      )}
                    </div>
                  )}
                </div>
                {project.details.footer && (
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: "'DM Mono', monospace" }}>
                    {project.details.footer}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ================== MAIN COMPONENT ================== */

export default function PortfolioShowcase() {
  const [dbProjects, setDbProjects] = useState<Project[]>([])

  useEffect(() => {
    const loadExtraProjects = async () => {
      const { data } = await supabase.from('projects').select('*')
      if (!data) return

      const mapped: Project[] = data.map((row: any) => ({
        id: row.id,
        category: 'learning' as const,
        title: row.title,
        subtitle: '',
        status: 'Added via admin',
        statusColor: '#34C98E',
        description: row.description,
        tech: Array.isArray(row.technologies) ? row.technologies : [],
        slides: (Array.isArray(row.image_urls) ? row.image_urls : row.image_url ? [row.image_url] : []).map(
          (src: string, i: number) => ({
            key: `${row.id}-${i}`,
            label: `View ${i + 1}`,
            src,
            alt: row.title,
          })
        ),
        liveUrl: row.live_url || undefined,
        details: {
          sections: [
            {
              title: 'Key Features',
              content: Array.isArray(row.key_features) ? row.key_features.join(' • ') : '',
            },
          ],
        },
      }))

      setDbProjects(mapped)
    }

    loadExtraProjects()
  }, [])
  const flagshipProjects = PROJECTS.filter((p) => p.category === 'flagship')
  const learningProjects = PROJECTS.filter((p) => p.category === 'learning')

  return (
    <section
      id="projects"
      className="w-full max-w-[1100px] mx-auto px-5 sm:px-6 md:px-10 lg:px-20 pt-20 sm:pt-24 lg:pt-28 pb-10 text-white"
    >
      {/* ============ SECTION HEADER ============ */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        style={{ marginBottom: 48 }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.2em',
          }}
        >
          SELECTED PROJECTS
        </span>
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 800,
            marginTop: 10,
            color: '#fff',
          }}
        >
          What I&apos;ve Built
        </h2>
        <p
          style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.7,
            marginTop: 10,
            maxWidth: 520,
          }}
        >
          From flagship systems to learning experiments — each project taught me
          something new about building real software.
        </p>
      </motion.div>

      {/* ============ FLAGSHIP PROJECTS ============ */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        style={{ marginBottom: 20 }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 20,
              fontWeight: 700,
              color: '#FF8A45',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            ★ Flagship Projects
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,138,69,0.15)' }} />
        </div>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 48 }}>
        {flagshipProjects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>

      {/* ============ BUILT WHILE LEARNING ============ */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        style={{ marginBottom: 20 }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 20,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            Built While Learning
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </div>
        <p
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.35)',
            lineHeight: 1.7,
            maxWidth: 500,
            marginBottom: 8,
          }}
        >
          Not every project needs to change the world. Some taught me how graphics work,
          some taught me how APIs behave, and some simply taught me why debugging is 90% of software engineering.
        </p>
      </motion.div>
        <ProjectMarquee projects={[...learningProjects, ...dbProjects]} />
    </section>
  )
}