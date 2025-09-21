"use client";

import { useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import LiquidEther from "@/components/LiquidEther";
import BlurText from "@/components/BlurText";
import { StarBorder } from "@/components/ui/star-border";
import { Github, Linkedin, Mail, Code, Globe, Database, Server, Brain, Monitor, Shield, Layers, Box, Smartphone, Languages } from "lucide-react";

// Translation objects
interface Translation {
  home: string;
  about: string;
  projects: string;
  skills: string;
  personal: string;
  education: string;
  contact: string;
  name: string;
  tagline: string;
  aboutTitle: string;
  aboutDesc: string;
  github: string;
  email: string;
  linkedin: string;
  skillsTitle: string;
  projectsTitle: string;
  educationTitle: string;
  personalTitle: string;
  contactTitle: string;
  contactText: string;
  postAIInvesting: { desc: string };
  hyperliquidTracker: { desc: string };
  audUsdAnalyzer: { desc: string };
  thresaurus: { desc: string };
  appleMediaConverter: { desc: string };
  mediatheque: { desc: string };
  invoiceGenerator: { desc: string };
  secondaryDiploma: string;
  computerProgram: string;
  aiCertification: string;
  internship: string;
  comingSoon: string;
  personalQualities: string;
  qualities: string[];
  programmingLanguages: string;
  webDevelopment: string;
  databases: string;
  networkAdministration: string;
  artificialIntelligence: string;
  operatingSystems: string;
  cybersecurity: string;
  dotnetFrameworks: string;
  graphics3d: string;
  mobileDevelopment: string;
  csharp: string;
  python: string;
  java: string;
  php: string;
  javascript: string;
  bash: string;
  html: string;
  css: string;
  react: string;
  nodejs: string;
  nextjs: string;
  sql: string;
  mysql: string;
  sqlAlchemy: string;
  ormPython: string;
  dataModeling: string;
  serverConfig: string;
  infrastructureManagement: string;
  windowsServer: string;
  windows: string;
  linux: string;
  kaliLinux: string;
  geminiApi: string;
  aiIntegration: string;
  penetrationTesting: string;
  vulnerabilityAnalysis: string;
  securityTools: string;
  adoNet: string;
  razorPages: string;
  aspNet: string;
  entityFramework: string;
  webgl: string;
  threeJs: string;
  shaders: string;
  kotlin: string;
  reactNative: string;
  swift: string;
}

const translations: Record<'fr' | 'en', Translation> = {
  fr: {
    home: "Accueil",
    about: "Profil", 
    projects: "Projets",
    skills: "Compétences",
    personal: "Personnel",
    education: "Formation",
    contact: "Contact",
    name: "Jawad Bouchiba",
    tagline: "Étudiant en informatique — Passionné par le développement logiciel et l’IA.",
    aboutTitle: "Profil",
    aboutDesc: "Étudiant en informatique au Cégep Gérald-Godin. Curieux, analytique et passionné par l'intégration des nouvelles technologies et de l'intelligence artificielle dans des projets concrets.",
    github: "GitHub",
    email: "Email",
    linkedin: "LinkedIn",
    skillsTitle: "Compétences Techniques",
    projectsTitle: "Projets Récents",
    educationTitle: "Formation",
    personalTitle: "Atouts Personnels",
    contactTitle: "Me Contacter",
    contactText: "Parlons ensemble 👋",
    // Projects
    postAIInvesting: {
      desc: "Plateforme d'investissement intelligent analysant les actualités financières en temps réel via News API et Gemini AI."
    },
    hyperliquidTracker: {
      desc: "Solution de tracking blockchain pour analyser les transactions des gros investisseurs sur Hyperliquid."
    },
    audUsdAnalyzer: {
      desc: "Analyseur du trading pair AUD-USD utilisant pandas pour analyser les données historiques et identifier des conditions optimales afin d'améliorer le taux de réussite des trades."
    },
    thresaurus: {
      desc: "Jeu Unity où le joueur doit naviguer dans un labyrinthe pour trouver tous les trésors malgré les obstacles. Comprend 10 niveaux avec gameplay engageant."
    },
    appleMediaConverter: {
      desc: "Site web HTML/JavaScript utilisant ffmpeg pour convertir les formats média Apple (HEIC, MOV) vers des formats compatibles Windows (JPG, MP4)."
    },
    mediatheque: {
      desc: "Système de bibliothèque complet en Java avec JavaFX permettant l'échange et le retrait de livres, la création de comptes, les modifications et les propositions clients. Interface utilisateur complète avec base de données locale."
    },
    invoiceGenerator: {
      desc: "Plateforme SaaS en développement pour générer des factures professionnelles en ligne. Permet la création, personnalisation et gestion de factures avec interface moderne et fonctionnalités avancées."
    },
    // Education
    secondaryDiploma: "Diplôme d'éducation secondaire — École Cité-des-Jeunes",
    computerProgram: "Technique Informatique — Cégep Gérald-Godin",
    aiCertification: "Certification AI Fluency: Framework & Foundations",
    internship: "Stage en informatique",
    comingSoon: "À venir!",
    // Personal qualities
    personalQualities: "Qualités Personnelles",
    qualities: ["Curieux et en constante amélioration", "Esprit analytique et logique", "Capacité à résoudre des problèmes complexes", "Esprit d'équipe et collaboration efficace"],
    // Skills categories
    programmingLanguages: "Langages de Programmation",
    webDevelopment: "Développement Web",
    databases: "Bases de Données", 
    networkAdministration: "Administration Réseaux",
    artificialIntelligence: "Intelligence Artificielle",
    operatingSystems: "Systèmes d'Exploitation",
    cybersecurity: "Cybersécurité",
    dotnetFrameworks: "Frameworks .NET",
    graphics3d: "Programmation 3D & Graphismes",
    mobileDevelopment: "Développement Mobile",
    // Individual skill items
    csharp: "C#",
    python: "Python",
    java: "Java",
    php: "PHP",
    javascript: "JavaScript",
    bash: "Bash",
    html: "HTML",
    css: "CSS",
    react: "React",
    nodejs: "Node.js",
    nextjs: "Next.js",
    sql: "SQL",
    mysql: "MySQL",
    sqlAlchemy: "SQL Alchemy",
    ormPython: "ORM Python",
    dataModeling: "Modélisation de données",
    serverConfig: "Configuration de serveurs",
    infrastructureManagement: "Gestion des infrastructures",
    windowsServer: "Windows Server",
    windows: "Windows",
    linux: "Linux",
    kaliLinux: "Kali Linux",
    geminiApi: "API Gemini",
    aiIntegration: "Intégration AI",
    penetrationTesting: "Tests de pénétration",
    vulnerabilityAnalysis: "Analyse de vulnérabilités",
    securityTools: "Outils de sécurité",
    adoNet: "ADO.NET",
    razorPages: "Razor Pages",
    aspNet: "ASP.NET",
    entityFramework: "Entity Framework",
    webgl: "WebGL",
    threeJs: "Three.js",
    shaders: "Shaders",
    kotlin: "Kotlin",
    reactNative: "React Native",
    swift: "Swift"
  },
  en: {
    home: "Home",
    about: "Profile", 
    projects: "Projects",
    skills: "Skills",
    personal: "Personal",
    education: "Education",
    contact: "Contact",
    name: "Jawad Bouchiba",
    tagline: "Computer Science Student — Passionate about software development and AI.",
    aboutTitle: "Profile",
    aboutDesc: "Computer science student at Cégep Gérald-Godin. Curious, analytical and passionate about integrating new technologies and artificial intelligence into concrete projects.",
    github: "GitHub",
    email: "Email",
    linkedin: "LinkedIn",
    skillsTitle: "Technical Skills",
    projectsTitle: "Recent Projects",
    educationTitle: "Education",
    personalTitle: "Personal Strengths",
    contactTitle: "Contact Me",
    contactText: "Let's talk 👋",
    // Projects
    postAIInvesting: {
      desc: "Intelligent investment platform analyzing financial news in real-time via News API and Gemini AI."
    },
    hyperliquidTracker: {
      desc: "Blockchain tracking solution to analyze transactions of major investors on Hyperliquid."
    },
    audUsdAnalyzer: {
      desc: "AUD-USD trading pair analyzer using pandas to analyze historical data and identify optimal conditions to improve trade success rate."
    },
    thresaurus: {
      desc: "Unity game where the player must navigate through a labyrinth to find all treasures despite obstacles. Includes 10 levels with engaging gameplay."
    },
    appleMediaConverter: {
      desc: "HTML/JavaScript website using ffmpeg to convert Apple media formats (HEIC, MOV) to Windows compatible formats (JPG, MP4)."
    },
    mediatheque: {
      desc: "Complete library system in Java with JavaFX allowing book exchange and withdrawal, account creation, modifications and client proposals. Complete user interface with local database."
    },
    invoiceGenerator: {
      desc: "SaaS platform in development for generating professional invoices online. Allows creation, customization and management of invoices with modern interface and advanced features."
    },
    // Education
    secondaryDiploma: "Secondary Education Diploma — École Cité-des-Jeunes",
    computerProgram: "Computer Science Program — Cégep Gérald-Godin",
    aiCertification: "AI Fluency Certification: Framework & Foundations",
    internship: "Computer Science Internship",
    comingSoon: "Coming Soon!",
    // Personal qualities
    personalQualities: "Personal Qualities",
    qualities: ["Curious and constantly improving", "Analytical and logical mind", "Ability to solve complex problems", "Effective teamwork and collaboration"],
    // Skills categories
    programmingLanguages: "Programming Languages",
    webDevelopment: "Web Development",
    databases: "Databases", 
    networkAdministration: "Network Administration",
    artificialIntelligence: "Artificial Intelligence",
    operatingSystems: "Operating Systems",
    cybersecurity: "Cybersecurity",
    dotnetFrameworks: ".NET Frameworks",
    graphics3d: "3D Graphics & Programming",
    mobileDevelopment: "Mobile Development",
    // Individual skill items
    csharp: "C#",
    python: "Python",
    java: "Java",
    php: "PHP",
    javascript: "JavaScript",
    bash: "Bash",
    html: "HTML",
    css: "CSS",
    react: "React",
    nodejs: "Node.js",
    nextjs: "Next.js",
    sql: "SQL",
    mysql: "MySQL",
    sqlAlchemy: "SQL Alchemy",
    ormPython: "Python ORM",
    dataModeling: "Data Modeling",
    serverConfig: "Server Configuration",
    infrastructureManagement: "Infrastructure Management",
    windowsServer: "Windows Server",
    windows: "Windows",
    linux: "Linux",
    kaliLinux: "Kali Linux",
    geminiApi: "Gemini API",
    aiIntegration: "AI Integration",
    penetrationTesting: "Penetration Testing",
    vulnerabilityAnalysis: "Vulnerability Analysis",
    securityTools: "Security Tools",
    adoNet: "ADO.NET",
    razorPages: "Razor Pages",
    aspNet: "ASP.NET",
    entityFramework: "Entity Framework",
    webgl: "WebGL",
    threeJs: "Three.js",
    shaders: "Shaders",
    kotlin: "Kotlin",
    reactNative: "React Native",
    swift: "Swift"
  }
};

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

const sections = ["home", "about", "skills", "projects", "education", "personal", "contact"];

const sectionNames = {
  home: "Accueil",
  about: "Profil", 
  projects: "Projets",
  skills: "Compétences",
  personal: "Personnel",
  education: "Formation",
  contact: "Contact"
};


export default function Home() {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr');
  };

  const t = translations[language];
  const sectionLabels = {
    fr: sectionNames,
    en: {
      home: "Home",
      about: "Profile", 
      projects: "Projects",
      skills: "Skills",
      personal: "Personal",
      education: "Education",
      contact: "Contact"
    }
  };

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
  style={{
    width: "100%",
    height: "100vh",
    position: "fixed",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none", // ✅ empêche de bloquer tes clics
  }}
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
            style={{ minWidth: "100px", textAlign: "center", minHeight: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
          >
            {sectionLabels[language][section as keyof typeof sectionLabels.fr]}
            
          </StarBorder>
        ))}
        {/* Translate Button */}
        <StarBorder
          as="button"
          color="hsla(312, 100%, 50%, 1.00)"
          speed="6s"
          style={{ minWidth: "120px", textAlign: "center", minHeight: "40px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
          onClick={toggleLanguage}
        >
          <Languages size={16} />
          {language === 'fr' ? 'EN' : 'FR'}
        </StarBorder>
      </nav>

<section
  id="home"
  style={{
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    zIndex: 10,
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
      text={t.name}
      animateBy="words"
      direction="top"
      // remove style prop from BlurText; wrapping div handles size
    />
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 1.15 } }}
      style={{ marginTop: 16, opacity: 0.85, fontSize: 18 }}
    >
      {t.tagline}
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
  style={{
    width: "100%",
    height: "100vh",
    position: "fixed",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none", // ✅ empêche de bloquer tes clics
  }}
/>

          <div style={{ maxWidth: 900 }}>
            <motion.h2 variants={fadeUp} custom={0.05} style={{ fontSize: 34, marginBottom: 12, whiteSpace: "nowrap" }}>
              {t.aboutTitle}
            </motion.h2>
            <motion.p variants={fadeUp} custom={0.1} style={{ opacity: 0.9, lineHeight: 1.6 }}>
              {t.aboutDesc}
            </motion.p>
           {/* Liens sociaux avec logos */}
<motion.div
  variants={fadeUp}
  custom={0.15}
  style={{
    marginTop: 18,
    display: "flex",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <a
    href="https://github.com/jawadbouchiba"
    target="_blank"
    rel="noreferrer"
    style={{ display: "flex", alignItems: "center", gap: 6 }}
  >
    <Github size={20} /> {t.github}
  </a>

  <a
    href="mailto:jawad.bouchiba@icloud.com"
    style={{ display: "flex", alignItems: "center", gap: 6 }}
  >
    <Mail size={20} /> {t.email}
  </a>

  <a
    href="https://www.linkedin.com/in/jawad-bouchiba-a5b771349"
    target="_blank"
    rel="noreferrer"
    style={{ display: "flex", alignItems: "center", gap: 6 }}
  >
    <Linkedin size={20} /> {t.linkedin}
  </a>
</motion.div>
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
          <h2 style={{ fontSize: 34 }}>{t.skillsTitle}</h2>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
            {[
              { title: t.programmingLanguages, items: [t.csharp, t.python, t.java, t.php, t.javascript, t.bash], icon: Code },
              { title: t.webDevelopment, items: [t.html, t.css, t.javascript, t.php, t.react, t.nodejs, t.nextjs], icon: Globe },
              { title: t.databases, items: [t.sql, t.mysql, t.sqlAlchemy, t.ormPython, t.dataModeling], icon: Database },
              { title: t.networkAdministration, items: [t.serverConfig, t.infrastructureManagement, t.windowsServer, t.linux], icon: Server },
              { title: t.artificialIntelligence, items: [t.geminiApi, t.aiIntegration], icon: Brain },
              { title: t.operatingSystems, items: [t.windows, t.linux], icon: Monitor },
              { title: t.cybersecurity, items: [t.kaliLinux, t.penetrationTesting, t.vulnerabilityAnalysis, t.securityTools], icon: Shield },
              { title: t.dotnetFrameworks, items: [t.adoNet, t.razorPages, t.aspNet, t.entityFramework], icon: Layers },
              { title: t.graphics3d, items: [t.webgl, t.threeJs, t.shaders], icon: Box },
              { title: t.mobileDevelopment, items: [t.kotlin, t.reactNative, t.swift], icon: Smartphone },
            ].map((c) => (
              <TiltCard key={c.title}>
                <h3 style={{ marginBottom: 12, fontSize: 18, display: "flex", alignItems: "center", gap: 8 }}>
                  <c.icon size={20} /> {c.title}
                </h3>
                <ul style={{ textAlign: "left", paddingLeft: 20, opacity: 0.9, listStyleType: "disc" }}>
                  {c.items.map((i) => (
                    <li key={i} style={{ marginBottom: 8, fontSize: 14 }}>
                      {i}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            ))}
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
          <h2 style={{ fontSize: 34 }}>{t.projectsTitle}</h2>

          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
            {[
              {
                title: "PostAIInvesting",
                desc: t.postAIInvesting.desc,
                tech: ["News API", "Gemini AI", "React", "Node.js"],
              },
              {
                title: "Hyperliquid Whale Tracker",
                desc: t.hyperliquidTracker.desc,
                tech: ["Hyperliquid API", "Blockchain", "HTML", "JavaScript"],
              },
              {
                title: "AUD-USD Analyzer",
                desc: t.audUsdAnalyzer.desc,
                tech: ["Python", "Pandas", "Analyse de données", "Trading"],
              },
              {
                title: "Thresaurus",
                desc: t.thresaurus.desc,
                tech: ["Unity", "C#", "Game Development", "3D"],
              },
              {
                title: "Apple Media Converter",
                desc: t.appleMediaConverter.desc,
                tech: ["HTML", "JavaScript", "FFmpeg", "Media Conversion"],
              },
              {
                title: "Médiathèque",
                desc: t.mediatheque.desc,
                tech: ["Java", "JavaFX", "Base de données", "Interface utilisateur"],
              },
              {
                title: "SaaS Générateur de Factures en Ligne       (En développement)",
                desc: t.invoiceGenerator.desc,
                tech: ["React", "Node.js", "MongoDB", "SaaS"],
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
          <h2 style={{ fontSize: 34 }}>{t.educationTitle}</h2>
          <TiltCard>
            <div style={{ textAlign: "center" }}>
              <p style={{ opacity: 0.75 }}>2018 - 2023</p>
              <h3>{t.secondaryDiploma}</h3>
              <p style={{ opacity: 0.85 }}>Vaudreuil-Dorion, QC</p>
            </div>
          </TiltCard>

          <TiltCard>
            <div style={{ textAlign: "center" }}>
              <p style={{ opacity: 0.75 }}>2023 - Présent</p>
              <h3>{t.computerProgram}</h3>
              <p style={{ opacity: 0.85 }}>Ste.-Geneviève, QC</p>
            </div>
          </TiltCard>

          <TiltCard>
            <div style={{ textAlign: "center" }}>
              <p style={{ opacity: 0.75 }}>2025</p>
              <h3>{t.aiCertification}</h3>
              <p style={{ opacity: 0.85 }}>Anthropic</p>
            </div>
          </TiltCard>

          <TiltCard>
            <div style={{ textAlign: "center" }}>
              <p style={{ opacity: 0.75 }}>2026</p>
              <h3>{t.internship}</h3>
              <p style={{ opacity: 0.85 }}>{t.comingSoon}</p>
            </div>
          </TiltCard>
        </motion.section>

        {/* ATOUTS PERSONNELS */}
        <motion.section
          id="personal"
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
          <h2 style={{ fontSize: 34 }}>{t.personalTitle}</h2>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
            {[
              { title: t.personalQualities, items: t.qualities },
            ].map((c) => (
              <TiltCard key={c.title}>
                <h3 style={{ marginBottom: 12, fontSize: 18, fontWeight: "bold" }}>{c.title}</h3>
                <ul style={{ textAlign: "left", paddingLeft: 20, opacity: 0.9, listStyleType: "disc" }}>
                  {c.items.map((i) => (
                    <li key={i} style={{ marginBottom: 8, fontSize: 14 }}>
                      {i}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            ))}
          </div>
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
          <h2 style={{ fontSize: 34 }}>{t.contactTitle}</h2>
          <TiltCard>
            <div style={{ textAlign: "center" }}>
              <h3>{t.contactText}</h3>
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