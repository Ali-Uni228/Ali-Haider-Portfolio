"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Code, Award, Globe, FileText, ArrowUpRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { PROJECT_COUNT } from "@/components/sections/PortfolioShowcase";

/* ================== ANIMATION ================== */

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.16,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 35, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: 70, rotate: 2 },
  show: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 25 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ================== COMPONENT ================== */

export default function About() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const [certificateCount, setCertificateCount] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);

    check();
    window.addEventListener("resize", check);

    fetchStats();

    return () => window.removeEventListener("resize", check);
  }, []);

  const fetchStats = async () => {
    try {
      const { count: certificates } = await supabase
        .from("certificates")
        .select("*", { count: "exact", head: true });

      setCertificateCount(certificates || 0);
    } catch {
      setCertificateCount(0);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToPortfolio = () => scrollTo("projects");

  if (isMobile === null) return null;

  const stats = [
    {
      icon: <Code size={16} />,
      value: String(PROJECT_COUNT),
      title: "PROJECTS",
      target: "projects",
    },
    {
      icon: <Award size={16} />,
      value: String(certificateCount),
      title: "CERTIFICATES",
      target: "certificates",
    },
    {
      icon: <Globe size={16} />,
      value: String(PROJECT_COUNT + certificateCount),
      title: "COMPLETED WORKS",
      target: "projects",
    },
  ];

  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        padding: isMobile ? "60px 24px 30px" : "80px 60px 30px 120px",
      }}
    >
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "32px",
          }}
        >
          {/* LEFT */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-80px" }}
            style={{
              maxWidth: "600px",
              width: "100%",
            }}
          >
            <motion.div variants={fadeUp} style={{ marginBottom: 16 }}>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 12,
                  color: "var(--text-muted)",
                  letterSpacing: "0.2em",
                }}
              >
                ABOUT ME
              </span>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div
                style={{
                  fontSize: isMobile ? 32 : "clamp(32px,5vw,46px)",
                  fontWeight: 800,
                  lineHeight: 1.03,
                  color: "var(--text-primary)",
                }}
              >
                <div>Ali</div>
                <div>Haider</div>
              </div>
            </motion.div>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 1.1,
                    delay: 0.2,
                  },
                },
              }}
              style={{
                marginTop: 18,
                fontSize: 14,
                color: "var(--text-secondary)",
                lineHeight: 1.75,
                maxWidth: isMobile ? "100%" : "490px",
              }}
            >
              I&apos;m a BS Artificial Intelligence undergraduate based in
              Islamabad, Pakistan. What pulled me into programming wasn&apos;t
              wanting to build apps — it was wanting to know what&apos;s
              actually happening behind the button someone clicks. That
              curiosity about the logic running underneath everything is what
              turned into actually building things and teaching myself
              software engineering one problem at a time.
              <br />
              <br />
              I enjoy difficult projects because they force me to learn. Most
              of my projects don&apos;t work perfectly the first time—and
              that&apos;s the point. Breaking things, redesigning them, and
              spending hours figuring out why something failed has taught me
              far more than simply following tutorials ever could.
              <br />
              <br />
              I&apos;m still at the beginning of my journey, which makes
              software engineering even more exciting. There are countless
              technologies I haven&apos;t explored yet and countless mistakes
              I haven&apos;t made yet. I&apos;m looking for opportunities
              where I can learn from experienced engineers, contribute to
              meaningful projects, and become better every single day.
            </motion.p>

            {/* QUOTE */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.94 },
                show: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.9,
                    delay: 0.3,
                  },
                },
              }}
              style={{
                marginTop: 18,
                padding: "12px 25px",
                borderRadius: 10,
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                fontSize: 12,
                fontStyle: "italic",
                display: "inline-block",
                width: "fit-content",
              }}
            >
              “I learn software engineering by building things that are
              slightly beyond what I know how to build.”
            </motion.div>

            {/* BUTTONS */}
            <motion.div
              variants={fadeUp}
              style={{
                display: "flex",
                gap: 10,
                marginTop: 18,
                flexWrap: "wrap",
              }}
            >
              {/* DOWNLOAD CV */}
              <a
                href="/assets/ali/resume-ali-haider.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "10px 18px",
                    borderRadius: 8,
                    border: "1px solid white",
                    background: "white",
                    color: "black",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "transform 0.25s ease, opacity 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-2px) scale(1.03)";
                    e.currentTarget.style.opacity = "0.92";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  <FileText size={14} />
                  Download CV
                </button>
              </a>

              {/* VIEW PROJECTS */}
              <button
                onClick={scrollToPortfolio}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "10px 18px",
                  borderRadius: 8,
                  border: "1px solid white",
                  background: "transparent",
                  color: "white",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "transform 0.25s ease, opacity 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-2px) scale(1.03)";
                  e.currentTarget.style.opacity = "0.85";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.opacity = "1";
                }}
              >
                <ArrowUpRight size={14} />
                View Projects
              </button>
            </motion.div>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            style={{
              width: isMobile ? "100%" : "48%",
              display: "flex",
              justifyContent: isMobile ? "center" : "flex-end",
            }}
          >
            <div
              style={{
                padding: 12,
                borderRadius: "50%",
                border: "1px solid var(--border)",
                transform: isMobile ? "none" : "translateX(-80px)",
              }}
            >
              <img
                src="/assets/ali/portrait.png"
                alt="Portrait of Ali Haider"
                style={{
                  width: isMobile ? 160 : 240,
                  height: isMobile ? 160 : 240,
                  borderRadius: "50%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* CARDS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginTop: 50, marginBottom: 10 }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            Portfolio Showcase
          </h2>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: 18,
            marginTop: 36,
          }}
        >
          {stats.map((item, i) => (
            <motion.div
              key={i}
              variants={pop}
              whileHover={{ scale: 1.03 }}
              onClick={() => scrollTo(item.target)}
              style={{
                position: "relative",
                padding: 18,
                borderRadius: 16,
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 10,
                }}
              >
                {item.icon}
              </div>

              <div
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                {item.value}
              </div>

              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.08em",
                }}
              >
                {item.title}
              </div>

              <div
                onClick={() => scrollTo(item.target)}
                style={{
                  position: "absolute",
                  bottom: 14,
                  right: 14,
                  cursor: "pointer",
                }}
              >
                <ArrowUpRight size={15} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
