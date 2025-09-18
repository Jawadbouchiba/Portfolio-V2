"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import LiquidEther from "@/components/LiquidEther";
import BlurText from "@/components/BlurText";
import { StarBorder } from "@/components/ui/star-border";
import { Github, Linkedin, Mail } from "lucide-react";

/**
 * Tiny dependency-free TiltCard
 * - subtle tilt on pointer move
 * - smooth reset on leave
 * - configurable max tilt and scale
 */
function TiltCard({
  children,
  className,
  max = 10,
  scale = 1.02,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number; // degrees
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const handleMove = useCallback((e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1

    // map to -1..1
    const rx = (py - 0.5) * 2;
    const ry = (px - 0.5) * 2;

    const rotX = -rx * max; // invert Y for natural tilt
    const rotY = ry * max;

    // small parallax for background (optional)
    const transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (el) el.style.transform = transform;
      // subtle box shadow change:
      if (el) el.style.boxShadow = `0 8px 30px rgba(0,0,0,0.35)`;
      // optional glare: we control child .glare element via CSS (see below)
      const glare = el.querySelector<HTMLElement>(".glare");
      if (glare) {
        // position glare based on pointer
        const gx = (px - 0.5) * 200; // offset
        const gy = (py - 0.5) * 200;
        glare.style.transform = `translate(${gx}px, ${gy}px)`;
        glare.style.opacity = "0.12";
      }
    });
  }, [max, scale]);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    // reset with transition
    el.style.transition = "transform 450ms cubic-bezier(.2,.9,.2,1), box-shadow 300ms";
    el.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)`;
    el.style.boxShadow = `0 6px 18px rgba(0,0,0,0.28)`;
    const glare = el.querySelector<HTMLElement>(".glare");
    if (glare) {
      glare.style.transition = "opacity 300ms";
      glare.style.opacity = "0";
    }
    // clear transition after it finishes
    window.setTimeout(() => {
      if (el) el.style.transition = "";
      if (glare) glare.style.transition = "";
    }, 500);
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onPointerCancel={handleLeave}
      style={{
        background: "rgba(255,255,255,0.04)",
        borderRadius: 14,
        padding: "1.5rem",
        minWidth: 280,
        maxWidth: 520,
        textAlign: "center",
        position: "relative",
        transformStyle: "preserve-3d",
        willChange: "transform, box-shadow",
        boxShadow: "0 6px 18px rgba(0,0,0,0.28)",
        border: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}
      className={className}
    >
      {/* Subtle internal "glare" element (moves with pointer but very faint) */}
      <div
        className="glare"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "180%",
          height: "180%",
          pointerEvents: "none",
          transform: "translate(-50%,-50%)",
          background:
            "radial-gradient(1200px 600px at center, rgba(255,255,255,0.12), rgba(255,255,255,0.02) 30%, transparent 45%)",
          opacity: 0,
          transition: "opacity 200ms",
          mixBlendMode: "screen",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

// Framer Motion variants (fade + slide up)
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay },
  }),
};

const sections = ["home","about", "projects", "skills", "education", "contact"];


export default function Home() {
  return (
    
    <div
    
      style={{
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        scrollBehavior: "smooth",
      }}
    >
      {/* Liquid background fixed behind everything */}
      <LiquidEther
        colors={["#27ffa5ff", "#ade60fff", "#f30a0aff"]}
        mouseForce={20}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
        style={{ width: "100%", height: "100vh", position: "fixed", inset: 0, zIndex: 0 }}
      />

      {/* Top centered NavBar */}
      <nav
        style={{
          position: "fixed",
          top: 18,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "0.75rem",
          zIndex: 40,
          alignItems: "center",
          padding: "0.25rem 0.5rem",
        }}
        aria-label="Main navigation"
      >
        {sections.map((section) => (
          <StarBorder
            key={section}
            as="button"
            color="hsla(312, 100%, 50%, 1.00)"
            speed="6s"
            onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
            
          </StarBorder>
        ))}
      </nav>

<section
  id="hero"
  style={{
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    zIndex: 10,
    pointerEvents: "none",
  }}
>
  <div
    style={{
      maxWidth: 980,
      fontSize: "4rem", // 4x bigger
      lineHeight: 1.1,
      fontWeight: "bold",
      color: "#fff",
    }}
  >
    <BlurText
      text="Jawad Bouchiba"
      animateBy="words"
      direction="top"
      // remove style prop from BlurText; wrapping div handles size
    />
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 1.15 } }}
      style={{ marginTop: 16, opacity: 0.85, fontSize: 18 }}
    >
      Étudiant en informatique — Passionné par le développement logiciel et l’IA.
    </motion.p>
  </div>
</section>


      <main style={{ position: "relative", zIndex: 10 }}>
        {/* ABOUT */}
        <motion.section
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          custom={0}
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "3rem",
            textAlign: "center",
          }}
        >
          <LiquidEther
        colors={["#27ffa5ff", "#ade60fff", "#f30a0aff"]}
        mouseForce={20}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
        style={{ width: "100%", height: "100vh", position: "fixed", inset: 0, zIndex: 0 }}
      />
          <div style={{ maxWidth: 900 }}>
            <motion.h2 variants={fadeUp} custom={0.05} style={{ fontSize: 34, marginBottom: 12 }}>
              À Propos
            </motion.h2>
            <motion.p variants={fadeUp} custom={0.1} style={{ opacity: 0.9, lineHeight: 1.6 }}>
              Étudiant en informatique au Cégep Gérald-Godin. Curieux, analytique et passionné par l’intégration des nouvelles
              technologies et de l’intelligence artificielle dans des projets concrets.
            </motion.p>
                {/* Liens sociaux avec logos */}
            <motion.div
              variants={fadeUp}
              custom={0.15}
              style={{ marginTop: 18, display: "flex", gap: 20, justifyContent: "center", alignItems: "center" }}
            >
              <a href="https://github.com/mszastro" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Github size={20} /> GitHub
              </a>
              <a href="mailto:jawad.bouchiba@icloud.com" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Mail size={20} /> Email
              </a>
              <a
                href="https://www.linkedin.com/in/jawad-bouchiba-a5b771349"
                target="_blank"
                rel="noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <Linkedin size={20} /> LinkedIn
              </a>
            </motion.div>
          </div>
        </motion.section>

        {/* PROJECTS */}
        <motion.section
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={0}
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "3rem",
            gap: 24,
            flexDirection: "column",
          }}
        >
          <h2 style={{ fontSize: 34 }}>Projets Récents</h2>

          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
            {[
              {
                title: "PostAIInvesting",
                desc: "Plateforme d'investissement intelligent analysant les actualités financières en temps réel via News API et Gemini AI.",
                tech: ["News API", "Gemini AI", "React", "Node.js"],
              },
              {
                title: "Hyperliquid Whale Tracker",
                desc: "Solution de tracking blockchain pour analyser les transactions des gros investisseurs sur Hyperliquid.",
                tech: ["Hyperliquid API", "Blockchain", "Python", "HTML", "JavaScript"],
              },
            ].map((p) => (
              <TiltCard key={p.title}>
                <h3 style={{ fontSize: 20, marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontSize: 14, opacity: 0.85 }}>{p.desc}</p>
                <div style={{ marginTop: 10, display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                  {p.tech.map((t) => (
                    <span key={t} style={{ fontSize: 12, opacity: 0.7, padding: "4px 8px", borderRadius: 8, background: "rgba(255,255,255,0.02)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </TiltCard>
            ))}
          </div>
        </motion.section>

        {/* SKILLS */}
        <motion.section
          id="skills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "3rem",
            gap: 24,
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: 34 }}>Compétences Techniques</h2>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
            {[
              { title: "Langages", items: ["C#", "Python", "Java", "PHP", "JavaScript", "HTML", "Bash"] },
              { title: "Bases de données", items: ["SQL", "MySQL"] },
              { title: "Réseaux & Sécurité", items: ["Windows Server", "Linux", "Firewall", "VPN"] },
            ].map((c) => (
              <TiltCard key={c.title}>
                <h3 style={{ marginBottom: 8 }}>{c.title}</h3>
                <ul style={{ textAlign: "left", paddingLeft: 16, opacity: 0.9 }}>
                  {c.items.map((i) => (
                    <li key={i} style={{ marginBottom: 6 }}>
                      {i}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            ))}
          </div>
        </motion.section>

        {/* EDUCATION */}
        <motion.section
          id="education"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "3rem",
            gap: 12,
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: 34 }}>Formation</h2>
          <TiltCard>
            <div style={{ textAlign: "center" }}>
              <p style={{ opacity: 0.75 }}>2023 - Présent</p>
              <h3>Technique Informatique — Cégep Gérald-Godin</h3>
              <p style={{ opacity: 0.85 }}>Ste.-Geneviève, QC</p>
            </div>
          </TiltCard>

          <TiltCard>
            <div style={{ textAlign: "center" }}>
              <p style={{ opacity: 0.75 }}>2018 - 2023</p>
              <h3>Diplôme d'éducation secondaire — École Cité-des-Jeunes</h3>
              <p style={{ opacity: 0.85 }}>Vaudreuil-Dorion, QC</p>
            </div>
          </TiltCard>
        </motion.section>

        {/* CONTACT */}
        <motion.section
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "3rem",
            gap: 8,
            flexDirection: "column",
          }}
        >
          <h2 style={{ fontSize: 34 }}>Me Contacter</h2>
          <TiltCard>
            <div style={{ textAlign: "center" }}>
              <h3>Parlons ensemble 👋</h3>
              <a href="mailto:jawad.bouchiba@icloud.com" style={{ textDecoration: "underline", color: "inherit" }}>
                jawad.bouchiba@icloud.com
              </a>
            </div>
          </TiltCard>
        </motion.section>
      </main>
    </div>
  );
}