"use client";

import { useState, useEffect, useRef } from "react";

// ─── CONSTANTS ───────────────────────────────────────────────
const COLORS = {
  sumi: "#0e0e0c",
  washi: "#e8e0d4",
  beni: "#c4533a",
  gold: "#c4a882",
  indigo: "#2c3e50",
  matcha: "#5a7a6a",
  earth: "#8b6f47",
  stone: "#b0a898",
  success: "#7a9a5a",
  info: "#5a7a8a",
  darkCard: "#161412",
  border: "#1e1e1a",
  dimText: "#888",
  subtleText: "#666",
};

const FONTS = {
  display: "'Noto Serif JP', serif",
  body: "'DM Sans', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

// ─── SEO: JSON-LD STRUCTURED DATA ───────────────────────────
function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "champloo.ai",
    description:
      "Custom AI systems mixed into your existing operations — deployed on your hardware, trained on your data. Built for regulated industries in Salt Lake City.",
    url: "https://champloo.ai",
    areaServed: {
      "@type": "City",
      name: "Salt Lake City",
      addressRegion: "UT",
    },
    priceRange: "$$$",
    serviceType: [
      "AI Consulting",
      "Local AI Deployment",
      "AI Lead Qualification",
      "AI Operations Optimization",
      "Production Management Software",
      "AI Contract Generation",
    ],
    knowsAbout: [
      "On-premise AI deployment",
      "Fine-tuned language models",
      "Mortgage AI automation",
      "HIPAA compliant AI",
      "Freddie Mac AI governance",
      "Business process optimization with AI",
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is champloo.ai different from other AI consulting companies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We build AI that fits into your existing operations — not software you have to reshape your business around. Models run on your hardware, trained on your data, and optimized for how your team actually works.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to deploy an AI system?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MVP in 4 weeks. Hardware setup and data collection in week 1, model fine-tuning and integrations in week 2, dashboard and testing in week 3, shadow testing alongside your team and go-live in week 4.",
        },
      },
      {
        "@type": "Question",
        name: "What industries do you serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We specialize in regulated industries including mortgage lending, legal, healthcare, and production management.",
        },
      },
      {
        "@type": "Question",
        name: "Does my data stay private?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All AI models run on hardware physically located in your office. No cloud APIs, no third-party model training on your data.",
        },
      },
      {
        "@type": "Question",
        name: "How much does it cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Setup starts at $3,000-$5,000 with monthly subscriptions from $1,500-$4,000 depending on scope.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}

// ─── ANIMATION ───────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease-out ${delay}ms, transform 0.5s ease-out ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── SHARED COMPONENTS ───────────────────────────────────────
function Logo({ size = 28 }) {
  return (
    <span
      style={{
        fontFamily: FONTS.display,
        fontSize: size,
        fontWeight: 900,
        color: COLORS.washi,
        letterSpacing: -0.5,
        userSelect: "none",
      }}
    >
      champloo<span style={{ color: COLORS.beni }}>.ai</span>
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontSize: 10,
        fontFamily: FONTS.body,
        fontWeight: 700,
        letterSpacing: 3,
        textTransform: "uppercase",
        color: COLORS.beni,
        marginBottom: 16,
      }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <h2
      style={{
        fontFamily: FONTS.display,
        fontSize: 40,
        fontWeight: 700,
        color: COLORS.washi,
        margin: 0,
        lineHeight: 1.15,
        letterSpacing: -0.5,
        maxWidth: 700,
      }}
    >
      {children}
    </h2>
  );
}

function BodyText({ children }) {
  return (
    <p
      style={{
        fontFamily: FONTS.body,
        fontSize: 15,
        lineHeight: 1.75,
        color: COLORS.stone,
        margin: "0 0 16px",
        maxWidth: 620,
      }}
    >
      {children}
    </p>
  );
}

function BrushDivider() {
  return (
    <div
      style={{
        width: 80,
        height: 3,
        background: `linear-gradient(90deg, ${COLORS.beni}, transparent)`,
        borderRadius: 2,
        marginTop: 16,
        marginBottom: 40,
      }}
    />
  );
}

function CTAButton({ children, onClick, secondary, style = {} }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: FONTS.body,
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: 0.5,
        padding: secondary ? "12px 28px" : "14px 32px",
        border: secondary ? `1px solid ${COLORS.border}` : "none",
        borderRadius: 6,
        background: secondary
          ? hovered
            ? COLORS.darkCard
            : "transparent"
          : hovered
            ? "#d4634a"
            : COLORS.beni,
        color: secondary ? COLORS.stone : COLORS.washi,
        cursor: "pointer",
        transition: "all 0.2s ease-out",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function GrainOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0.035,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

// ─── NAV ─────────────────────────────────────────────────────
function Nav({ onCTA }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "How It Works", href: "#how" },
    { label: "Industries", href: "#industries" },
    { label: "Results", href: "#results" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      role="banner"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 40px",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(14,14,12,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? `1px solid ${COLORS.border}`
          : "1px solid transparent",
        transition: "all 0.3s ease-out",
      }}
    >
      <a href="#" style={{ textDecoration: "none" }}>
        <Logo size={22} />
      </a>
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{ display: "flex", alignItems: "center", gap: 32 }}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            style={{
              fontFamily: FONTS.body,
              fontSize: 13,
              color: COLORS.stone,
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.target.style.color = COLORS.washi)}
            onMouseLeave={(e) => (e.target.style.color = COLORS.stone)}
          >
            {l.label}
          </a>
        ))}
        <CTAButton
          onClick={onCTA}
          style={{ padding: "8px 20px", fontSize: 12 }}
        >
          Get Your AI Assessment
        </CTAButton>
      </nav>
    </header>
  );
}

// ─── HERO ────────────────────────────────────────────────────
function Hero({ onCTA }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      aria-labelledby="hero-heading"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 60px 80px",
        overflow: "hidden",
        background: `radial-gradient(ellipse 80% 60% at 20% 50%, rgba(196,83,58,0.06) 0%, transparent 60%),
                     radial-gradient(ellipse 60% 50% at 80% 30%, rgba(196,168,130,0.04) 0%, transparent 60%),
                     ${COLORS.sumi}`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 0,
          bottom: 0,
          width: 1,
          background: `linear-gradient(180deg, transparent, ${COLORS.border}, transparent)`,
        }}
      />
      <div style={{ maxWidth: 900, position: "relative", zIndex: 1 }}>
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.6s ease-out",
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 12,
              color: COLORS.beni,
              marginBottom: 24,
              letterSpacing: 1,
            }}
          >
            // Salt Lake City — AI systems for regulated industries
          </div>
        </div>

        <h1
          id="hero-heading"
          style={{
            fontFamily: FONTS.display,
            fontSize: 72,
            fontWeight: 900,
            color: COLORS.washi,
            lineHeight: 1.05,
            margin: 0,
            letterSpacing: -2,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.6s ease-out 0.15s",
          }}
        >
          AI that fits
          <br />
          <span style={{ color: COLORS.beni }}>how you already work.</span>
        </h1>

        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s ease-out 0.35s",
          }}
        >
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 18,
              lineHeight: 1.7,
              color: COLORS.stone,
              marginTop: 32,
              maxWidth: 580,
            }}
          >
            We mix custom AI into your existing operations — trained on your
            data, running on your hardware, optimized for your business. Not a
            product you reshape your workflow around. A system built around the
            workflow you already have.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 40,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s ease-out 0.5s",
          }}
        >
          <CTAButton onClick={onCTA}>Get Your Free AI Assessment →</CTAButton>
          <CTAButton
            secondary
            onClick={() =>
              document
                .getElementById("how")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            See How It Works
          </CTAButton>
        </div>

        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 64,
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.5s ease-out 0.7s",
          }}
        >
          {[
            { val: "4 weeks", label: "to live system" },
            { val: "168 hrs/wk", label: "always running" },
            { val: "0 bytes", label: "sent to cloud" },
          ].map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 20,
                  fontWeight: 500,
                  color: COLORS.gold,
                }}
              >
                {s.val}
              </div>
              <div
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 11,
                  color: COLORS.subtleText,
                  marginTop: 4,
                  letterSpacing: 0.5,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CHANPURŪ PHILOSOPHY ─────────────────────────────────────
function Philosophy() {
  return (
    <section
      style={{
        padding: "100px 60px",
        background: COLORS.darkCard,
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel>The Champloo Philosophy</SectionLabel>
          <SectionHeading>
            Chanpurū — to mix things together.
          </SectionHeading>
          <BrushDivider />
          <BodyText>
            The word &ldquo;champloo&rdquo; comes from the Okinawan
            &ldquo;chanpurū&rdquo; — a stir-fry where every ingredient keeps
            its identity but the combination becomes something better than any
            piece alone. That&rsquo;s what we do with AI.
          </BodyText>
          <BodyText>
            We don&rsquo;t hand you a product and tell you to change how you
            work. We study your operations, learn your language, and mix AI into
            the places where it makes everything run faster, sharper, and more
            efficiently — without breaking what already works.
          </BodyText>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 24,
            marginTop: 40,
          }}
        >
          {[
            {
              title: "Your ingredients",
              body: "Your team, your data, your workflows, your compliance requirements. These don't change. They're the foundation.",
              icon: "素",
            },
            {
              title: "Our heat",
              body: "Fine-tuned AI models, engineered pipelines, deterministic validation. Purpose-built for your specific operations.",
              icon: "火",
            },
            {
              title: "Better together",
              body: "The same team, doing what they do best — with AI handling the repetitive, time-consuming work that slows everything down.",
              icon: "合",
            },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div
                style={{
                  background: COLORS.sumi,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  padding: 28,
                  height: "100%",
                }}
              >
                <div
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 28,
                    color: COLORS.beni,
                    marginBottom: 16,
                    opacity: 0.7,
                  }}
                >
                  {c.icon}
                </div>
                <h3
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 18,
                    color: COLORS.washi,
                    margin: "0 0 10px",
                    fontWeight: 700,
                  }}
                >
                  {c.title}
                </h3>
                <p
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 13,
                    color: COLORS.dimText,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROBLEM ─────────────────────────────────────────────────
function Problem() {
  return (
    <section style={{ padding: "100px 60px", background: COLORS.sumi }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel>The Problem</SectionLabel>
          <SectionHeading>
            Off-the-shelf AI optimizes for the software. Not for you.
          </SectionHeading>
          <BrushDivider />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 24,
            marginTop: 20,
          }}
        >
          {[
            {
              title: "Cloud AI is a liability",
              body: "Sending borrower data, patient records, or legal documents to third-party servers isn't just risky — in regulated industries, it's a compliance violation waiting to happen.",
              icon: "⊘",
            },
            {
              title: "Generic tools, generic results",
              body: "Copilot and ChatGPT are built for everyone — which means they're built for nobody. Your mortgage workflows, production schedules, and contracts need AI that speaks your language.",
              icon: "◇",
            },
            {
              title: "Enterprise AI ignores you",
              body: "Microsoft and Salesforce build for Fortune 500. If you have 8 employees and a real operational bottleneck, nobody's building for you. Until now.",
              icon: "△",
            },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div
                style={{
                  background: COLORS.darkCard,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  padding: 28,
                  height: "100%",
                }}
              >
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 24,
                    color: COLORS.beni,
                    marginBottom: 16,
                  }}
                >
                  {c.icon}
                </div>
                <h3
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 18,
                    color: COLORS.washi,
                    margin: "0 0 10px",
                    fontWeight: 700,
                  }}
                >
                  {c.title}
                </h3>
                <p
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 13,
                    color: COLORS.dimText,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ────────────────────────────────────────────
function HowItWorks() {
  return (
    <section
      id="how"
      style={{
        padding: "100px 60px",
        background: `linear-gradient(180deg, ${COLORS.darkCard} 0%, ${COLORS.sumi} 100%)`,
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel>How It Works</SectionLabel>
          <SectionHeading>
            Four weeks from handshake to live system.
          </SectionHeading>
          <BrushDivider />
        </Reveal>

        <div style={{ position: "relative", marginTop: 20 }}>
          <div
            style={{
              position: "absolute",
              left: 19,
              top: 20,
              bottom: 20,
              width: 1,
              background: `linear-gradient(180deg, ${COLORS.beni}, ${COLORS.gold}, transparent)`,
            }}
          />
          {[
            {
              week: "01",
              title: "We learn how you work.",
              desc: "We shadow your operations, collect data — conversation logs, documents, workflows. We learn the language your team speaks and map the bottlenecks. Meanwhile, hardware gets assembled and configured.",
            },
            {
              week: "02",
              title: "Fine-tune. Integrate. Constrain.",
              desc: "Your data trains a model that understands your business. Twilio, DocuSign, weather APIs — whatever your operations need. Deterministic validation ensures the AI can't fail silently.",
            },
            {
              week: "03",
              title: "Dashboard. Testing. Edge cases.",
              desc: "Your team gets a clean interface to see everything the system produces. We run hundreds of synthetic scenarios. We find every edge case and fix it before you go live.",
            },
            {
              week: "04",
              title: "Shadow mode. Then live.",
              desc: "The AI runs alongside your team for 3-5 days. We compare results. Your team validates. Final tuning. Then it goes live — with monitoring from day one.",
            },
          ].map((step, i) => (
            <Reveal key={step.week} delay={i * 100}>
              <div
                style={{
                  display: "flex",
                  gap: 28,
                  marginBottom: 36,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: COLORS.sumi,
                    border: `2px solid ${COLORS.beni}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FONTS.mono,
                    fontSize: 12,
                    color: COLORS.beni,
                    flexShrink: 0,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {step.week}
                </div>
                <div style={{ paddingTop: 4 }}>
                  <h3
                    style={{
                      fontFamily: FONTS.display,
                      fontSize: 20,
                      color: COLORS.washi,
                      margin: "0 0 8px",
                      fontWeight: 700,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: 14,
                      color: COLORS.dimText,
                      lineHeight: 1.65,
                      margin: 0,
                      maxWidth: 560,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ARCHITECTURE ────────────────────────────────────────────
function Architecture() {
  return (
    <section style={{ padding: "100px 60px", background: COLORS.sumi }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel>Engineering Philosophy</SectionLabel>
          <SectionHeading>
            The model is the least important part.
          </SectionHeading>
          <BrushDivider />
          <BodyText>
            We don&rsquo;t trust the AI — we engineer systems around it.
            Structured output enforcement, deterministic validation, finite
            state machines, full audit trails. The AI handles natural
            conversation and data extraction. Everything else is locked down
            with code that doesn&rsquo;t hallucinate.
          </BodyText>
        </Reveal>

        <Reveal delay={100}>
          <div
            style={{
              background: COLORS.darkCard,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 10,
              padding: 32,
              fontFamily: FONTS.mono,
              fontSize: 13,
              lineHeight: 1.8,
              color: COLORS.success,
              marginTop: 16,
              overflow: "auto",
            }}
          >
            <span style={{ color: COLORS.subtleText }}>
              {"// Every model response passes through validation"}
            </span>
            <br />
            <span style={{ color: COLORS.gold }}>input</span>
            <span style={{ color: COLORS.dimText }}>{" → "}</span>
            <span style={{ color: COLORS.washi }}>LLM</span>
            <span style={{ color: COLORS.dimText }}>{" → "}</span>
            <span style={{ color: COLORS.beni }}>JSON validator</span>
            <span style={{ color: COLORS.dimText }}>{" → "}</span>
            <span style={{ color: COLORS.info }}>FSM state check</span>
            <span style={{ color: COLORS.dimText }}>{" → "}</span>
            <span style={{ color: COLORS.success }}>
              deterministic scoring
            </span>
            <span style={{ color: COLORS.dimText }}>{" → "}</span>
            <span style={{ color: COLORS.gold }}>output</span>
            <br />
            <br />
            <span style={{ color: COLORS.subtleText }}>
              {"// Sample structured output — the model returns this every time"}
            </span>
            <br />
            {"{"}
            <br />
            {"  "}
            <span style={{ color: COLORS.gold }}>&quot;reply&quot;</span>:{" "}
            <span style={{ color: COLORS.matcha }}>
              &quot;Great, and what&rsquo;s your current interest rate?&quot;
            </span>
            ,<br />
            {"  "}
            <span style={{ color: COLORS.gold }}>&quot;extracted&quot;</span>:{" "}
            {"{ "}
            <span style={{ color: COLORS.info }}>&quot;balance&quot;</span>:
            340000,{" "}
            <span style={{ color: COLORS.info }}>&quot;rate&quot;</span>: null{" "}
            {"}"},<br />
            {"  "}
            <span style={{ color: COLORS.gold }}>
              &quot;confidence&quot;
            </span>: <span style={{ color: COLORS.washi }}>0.95</span>,<br />
            {"  "}
            <span style={{ color: COLORS.gold }}>
              &quot;next_state&quot;
            </span>:{" "}
            <span style={{ color: COLORS.matcha }}>
              &quot;COLLECTING_RATE&quot;
            </span>
            <br />
            {"}"}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── INDUSTRIES ──────────────────────────────────────────────
function Industries() {
  const industries = [
    {
      name: "Mortgage & Lending",
      desc: "AI handles lead qualification via SMS around the clock — collecting balance, rate, term, address, and value so your loan officers focus on the leads that are actually ready. Freddie Mac AI governance compliant.",
      stat: "24/7 lead qualification",
      tag: "ACTIVE CLIENT",
    },
    {
      name: "Video & Photo Production",
      desc: "One platform for every moving piece of a shoot — crew, cast, travel, documents, budgets, accounting. AI reads receipts, generates ops orders, and flags when jobs trend over budget.",
      stat: "Full shoot lifecycle",
      tag: "ACTIVE BUILD",
    },
    {
      name: "Corporate Law",
      desc: "AI drafts contracts from your firm's own executed agreements. Multi-pass validation checks every clause, date, and party name. Full version history. Attorney-client privilege preserved by architecture.",
      stat: "On-premise contract generation",
      tag: "IN DISCUSSION",
    },
    {
      name: "Healthcare",
      desc: "Patient intake, scheduling, triage — streamlined with AI that runs on local hardware. HIPAA compliant by design, not by promise. No patient data ever touches a third-party server.",
      stat: "HIPAA by architecture",
      tag: "ACCEPTING CLIENTS",
    },
  ];

  return (
    <section
      id="industries"
      style={{
        padding: "100px 60px",
        background: `linear-gradient(180deg, ${COLORS.sumi} 0%, ${COLORS.darkCard} 100%)`,
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel>Industries</SectionLabel>
          <SectionHeading>
            Built for businesses where compliance isn&rsquo;t optional.
          </SectionHeading>
          <BrushDivider />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginTop: 20,
          }}
        >
          {industries.map((ind, i) => (
            <Reveal key={ind.name} delay={i * 80}>
              <div
                style={{
                  background: COLORS.sumi,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  padding: 28,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 14,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: FONTS.display,
                      fontSize: 20,
                      color: COLORS.washi,
                      margin: 0,
                      fontWeight: 700,
                    }}
                  >
                    {ind.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 9,
                      letterSpacing: 1,
                      color:
                        ind.tag === "ACTIVE CLIENT" ||
                        ind.tag === "ACTIVE BUILD"
                          ? COLORS.success
                          : COLORS.gold,
                      background:
                        ind.tag === "ACTIVE CLIENT" ||
                        ind.tag === "ACTIVE BUILD"
                          ? "rgba(122,154,90,0.12)"
                          : "rgba(196,168,130,0.12)",
                      padding: "4px 8px",
                      borderRadius: 4,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {ind.tag}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 13,
                    color: COLORS.dimText,
                    lineHeight: 1.65,
                    margin: "0 0 16px",
                    flex: 1,
                  }}
                >
                  {ind.desc}
                </p>
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 12,
                    color: COLORS.gold,
                  }}
                >
                  {ind.stat}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── RESULTS ─────────────────────────────────────────────────
function Results() {
  return (
    <section
      id="results"
      style={{ padding: "100px 60px", background: COLORS.darkCard }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel>The Difference</SectionLabel>
          <SectionHeading>
            Off-the-shelf software vs. a system built for you.
          </SectionHeading>
          <BrushDivider />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            marginTop: 20,
          }}
        >
          <Reveal delay={80}>
            <div>
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 14,
                  color: COLORS.dimText,
                  marginBottom: 20,
                }}
              >
                Generic SaaS Tool
              </div>
              {[
                { label: "Built for", val: "Everyone (nobody)" },
                { label: "Speaks your industry language", val: "No" },
                { label: "Data location", val: "Their cloud" },
                { label: "Learns your workflows", val: "You learn theirs" },
                { label: "Regulatory audit trail", val: "Maybe" },
                {
                  label: "Adapts when your process changes",
                  val: "Feature request",
                },
              ].map((r) => (
                <div
                  key={r.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: `1px solid ${COLORS.border}`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: 13,
                      color: COLORS.dimText,
                    }}
                  >
                    {r.label}
                  </span>
                  <span
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 13,
                      color: COLORS.stone,
                    }}
                  >
                    {r.val}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div>
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 14,
                  color: COLORS.beni,
                  marginBottom: 20,
                }}
              >
                champloo.ai System
              </div>
              {[
                { label: "Built for", val: "Your operations" },
                {
                  label: "Speaks your industry language",
                  val: "Fine-tuned on it",
                },
                { label: "Data location", val: "Your hardware" },
                { label: "Learns your workflows", val: "Trained on them" },
                {
                  label: "Regulatory audit trail",
                  val: "Built into architecture",
                },
                {
                  label: "Adapts when your process changes",
                  val: "We retrain",
                },
              ].map((r) => (
                <div
                  key={r.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: `1px solid ${COLORS.border}`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: 13,
                      color: COLORS.dimText,
                    }}
                  >
                    {r.label}
                  </span>
                  <span
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 13,
                      color: COLORS.success,
                    }}
                  >
                    {r.val}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={240}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 20,
              marginTop: 60,
            }}
          >
            {[
              {
                val: "24/7",
                label: "Operations coverage",
                desc: "Your AI system doesn't take breaks, call in sick, or need to be trained twice on the same process.",
              },
              {
                val: "100%",
                label: "Data sovereignty",
                desc: "Every byte stays on your hardware. No cloud dependencies. Full audit trail for regulatory review.",
              },
              {
                val: "4 wks",
                label: "Time to live",
                desc: "From handshake to working system. Not 4 months. Not 4 quarters. Real results, fast.",
              },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: COLORS.sumi,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  padding: 24,
                }}
              >
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 28,
                    color: COLORS.gold,
                    fontWeight: 500,
                  }}
                >
                  {s.val}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 13,
                    color: COLORS.washi,
                    marginTop: 6,
                    fontWeight: 700,
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 12,
                    color: COLORS.subtleText,
                    marginTop: 6,
                    lineHeight: 1.5,
                  }}
                >
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── PRICING ─────────────────────────────────────────────────
function Pricing() {
  const tiers = [
    {
      name: "Starter",
      audience: "1–3 people",
      setup: "$3,000",
      monthly: "$1,500",
      year1: "$21,000",
      features: [
        "Single AI workflow",
        "Local hardware deployment",
        "Monthly tuning",
        "Dashboard access",
      ],
    },
    {
      name: "Standard",
      audience: "5–15 people",
      setup: "$5,000",
      monthly: "$2,500",
      year1: "$35,000",
      features: [
        "Multi-workflow system",
        "Priority fine-tuning",
        "Custom integrations",
        "Weekly performance reports",
      ],
      highlight: true,
    },
    {
      name: "Premium",
      audience: "15+ / multi-branch",
      setup: "$7,500",
      monthly: "$4,000",
      year1: "$55,500",
      features: [
        "Enterprise-scale deployment",
        "Dedicated support",
        "Multi-location sync",
        "Custom AI development",
      ],
    },
  ];

  return (
    <section id="pricing" style={{ padding: "100px 60px", background: COLORS.sumi }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel>Pricing</SectionLabel>
          <SectionHeading>
            AI that runs 24/7 for less than you&rsquo;d expect.
          </SectionHeading>
          <BrushDivider />
          <BodyText>
            No per-seat pricing. No surprise API bills. One flat monthly
            subscription that covers the system, the tuning, and the support.
            Setup includes hardware for on-premise deployments.
          </BodyText>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 20,
            marginTop: 20,
          }}
        >
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <div
                style={{
                  background: COLORS.darkCard,
                  border: `1px solid ${t.highlight ? COLORS.beni : COLORS.border}`,
                  borderRadius: 8,
                  padding: 28,
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {t.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      top: -1,
                      left: 28,
                      right: 28,
                      height: 2,
                      background: COLORS.beni,
                      borderRadius: "0 0 2px 2px",
                    }}
                  />
                )}
                <div
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 20,
                    color: COLORS.washi,
                    fontWeight: 700,
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 12,
                    color: COLORS.subtleText,
                    marginTop: 4,
                  }}
                >
                  {t.audience}
                </div>
                <div style={{ marginTop: 20 }}>
                  <span
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 32,
                      color: COLORS.gold,
                      fontWeight: 500,
                    }}
                  >
                    {t.monthly}
                  </span>
                  <span
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: 12,
                      color: COLORS.subtleText,
                    }}
                  >
                    /month
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 11,
                    color: COLORS.subtleText,
                    marginTop: 4,
                  }}
                >
                  {t.setup} setup · {t.year1} year 1
                </div>
                <div style={{ marginTop: 20, flex: 1 }}>
                  {t.features.map((f) => (
                    <div
                      key={f}
                      style={{
                        fontFamily: FONTS.body,
                        fontSize: 13,
                        color: COLORS.stone,
                        padding: "6px 0",
                        display: "flex",
                        gap: 8,
                        alignItems: "center",
                      }}
                    >
                      <span style={{ color: COLORS.success, fontSize: 10 }}>
                        ●
                      </span>{" "}
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={300}>
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 12,
              color: COLORS.subtleText,
              textAlign: "center",
              marginTop: 24,
            }}
          >
            3-month minimum commitment, then month-to-month. Hardware costs
            included in setup fee for on-premise deployments.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    {
      q: "How is champloo.ai different from other AI companies?",
      a: "We build AI that mixes into your existing operations — not software you reshape your business around. Every system is fine-tuned on your data, deployed on your hardware, and engineered for how your team actually works. Generic AI tools optimize for the software. We optimize for you.",
    },
    {
      q: "How long does it take to deploy an AI system?",
      a: "4 weeks from data handoff to live system. Week 1: we learn your operations and set up hardware. Week 2: fine-tuning and integrations. Week 3: dashboard and testing. Week 4: shadow mode alongside your team, then go live with monitoring.",
    },
    {
      q: "What industries do you work with?",
      a: "Regulated industries where data privacy and compliance matter — mortgage lending, corporate law, healthcare, and production management. We specialize in businesses with 5-30 employees that are big enough to have real operational bottlenecks but small enough that the owner makes the decision.",
    },
    {
      q: "Does my data stay completely private?",
      a: "Yes. All AI models run on hardware physically located in your office. No cloud APIs. No third-party model training on your data. Full conversation logs and scoring audit trails are stored locally for regulatory review. This isn't a feature — it's the architecture.",
    },
    {
      q: "What happens if the AI makes a mistake?",
      a: "Every AI response passes through a JSON validator and deterministic rules engine before reaching anyone. The model never acts unsupervised. When the validator catches an issue, it falls back to a templated response. Every failure is logged and becomes training data for the next version — the system gets smarter over time.",
    },
    {
      q: "What open-source models do you use?",
      a: "Qwen 2.5, Llama 3.3, Mistral, and DeepSeek — whichever best fits your use case. All run locally on consumer-grade GPUs. Fine-tuned on your data using QLoRA. No API costs, no vendor lock-in, no dependency on OpenAI or Google.",
    },
    {
      q: "Will this disrupt how my team works?",
      a: "The opposite. We build AI around your existing workflows, not the other way around. Your team keeps doing what they do — the AI handles the repetitive, time-consuming parts that slow things down. Shadow testing ensures everything works before anything changes.",
    },
    {
      q: "Can I see a demo?",
      a: "Absolutely. Start with the free AI assessment on this page — it takes 90 seconds and tells you where AI can optimize your specific operations. Then we'll walk you through the architecture and show you a working system.",
    },
  ];

  return (
    <section
      id="faq"
      style={{
        padding: "100px 60px",
        background: `linear-gradient(180deg, ${COLORS.sumi} 0%, ${COLORS.darkCard} 100%)`,
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel>FAQ</SectionLabel>
          <SectionHeading>Common questions.</SectionHeading>
          <BrushDivider />
        </Reveal>

        {faqs.map((f, i) => (
          <Reveal key={i} delay={i * 50}>
            <div style={{ borderBottom: `1px solid ${COLORS.border}` }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <h3
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 15,
                    color: COLORS.washi,
                    fontWeight: 500,
                    margin: 0,
                    paddingRight: 20,
                  }}
                >
                  {f.q}
                </h3>
                <span
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 18,
                    color: COLORS.beni,
                    flexShrink: 0,
                    transition: "transform 0.2s",
                    transform: open === i ? "rotate(45deg)" : "rotate(0)",
                  }}
                >
                  +
                </span>
              </button>
              <div
                style={{
                  maxHeight: open === i ? 300 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.3s ease-out",
                }}
              >
                <p
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 14,
                    color: COLORS.dimText,
                    lineHeight: 1.7,
                    margin: 0,
                    paddingBottom: 20,
                    maxWidth: 600,
                  }}
                >
                  {f.a}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── AI ASSESSMENT — calls /api/assess (server-side) ─────────
function AIAssessment({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadData, setLeadData] = useState({
    name: "",
    email: "",
    industry: "",
    size: "",
    pain: "",
  });
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const chatRef = useRef(null);

  const steps = [
    { key: "name", prompt: "What's your name?", placeholder: "Your name" },
    {
      key: "email",
      prompt: "What's the best email to reach you?",
      placeholder: "you@company.com",
    },
    {
      key: "industry",
      prompt: "What industry is your business in?",
      placeholder: "e.g. Mortgage, Law, Healthcare, Production...",
    },
    {
      key: "size",
      prompt: "How many people work at your company?",
      placeholder: "e.g. 8 employees",
    },
    {
      key: "pain",
      prompt:
        "What's the one task or workflow that eats the most time — the thing that slows everything else down?",
      placeholder: "Describe the bottleneck...",
    },
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "system",
          text: "Let's figure out where AI can make your operations run faster. Takes about 90 seconds.",
        },
        { role: "system", text: steps[0].prompt },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const val = input.trim();
    setInput("");

    const currentKey = steps[step]?.key;
    const newLead = { ...leadData, [currentKey]: val };
    setLeadData(newLead);
    setMessages((m) => [...m, { role: "user", text: val }]);

    if (step < steps.length - 1) {
      const nextStep = step + 1;
      setStep(nextStep);
      setTimeout(() => {
        setMessages((m) => [...m, { role: "system", text: steps[nextStep].prompt }]);
      }, 400);
    } else {
      // Final step — call OUR API route (not Anthropic directly)
      setLoading(true);
      try {
        const resp = await fetch("/api/assess", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newLead),
        });

        const data = await resp.json();
        const aiText =
          data.assessment ||
          "Thanks for sharing that. We'll follow up within 24 hours with a detailed assessment.";

        setMessages((m) => [
          ...m,
          { role: "system", text: "Analyzing your operations..." },
        ]);

        setTimeout(() => {
          setMessages((m) => [
            ...m.slice(0, -1),
            { role: "ai", text: aiText },
            {
              role: "system",
              text: `We'll send the full assessment to ${newLead.email}. Expect to hear from us within 24 hours.`,
            },
          ]);
          setSubmitted(true);
          setLoading(false);
        }, 1500);
      } catch {
        setMessages((m) => [
          ...m,
          {
            role: "system",
            text: `Got it. We'll review your answers and send a detailed assessment to ${newLead.email} within 24 hours.`,
          },
        ]);
        setSubmitted(true);
        setLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 480,
          maxHeight: "80vh",
          background: COLORS.sumi,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 12,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            borderBottom: `1px solid ${COLORS.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 16,
                color: COLORS.washi,
                fontWeight: 700,
              }}
            >
              AI Operations Assessment
            </div>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 10,
                color: COLORS.subtleText,
                marginTop: 2,
              }}
            >
              90 seconds · powered by champloo.ai
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: COLORS.subtleText,
              fontSize: 20,
              cursor: "pointer",
              padding: 4,
            }}
          >
            ×
          </button>
        </div>

        <div
          ref={chatRef}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%",
                padding: "10px 14px",
                borderRadius:
                  m.role === "user"
                    ? "12px 12px 4px 12px"
                    : "12px 12px 12px 4px",
                background:
                  m.role === "user"
                    ? COLORS.beni
                    : m.role === "ai"
                      ? "rgba(196,168,130,0.1)"
                      : COLORS.darkCard,
                border:
                  m.role === "ai"
                    ? `1px solid ${COLORS.gold}33`
                    : m.role === "user"
                      ? "none"
                      : `1px solid ${COLORS.border}`,
                fontFamily: FONTS.body,
                fontSize: 13,
                lineHeight: 1.6,
                color:
                  m.role === "user"
                    ? COLORS.washi
                    : m.role === "ai"
                      ? COLORS.gold
                      : COLORS.stone,
              }}
            >
              {m.role === "ai" && (
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 9,
                    color: COLORS.beni,
                    marginBottom: 6,
                    letterSpacing: 1,
                  }}
                >
                  AI ASSESSMENT
                </div>
              )}
              {m.text}
            </div>
          ))}
          {loading && (
            <div
              style={{
                alignSelf: "flex-start",
                padding: "10px 14px",
                background: COLORS.darkCard,
                border: `1px solid ${COLORS.border}`,
                borderRadius: "12px 12px 12px 4px",
              }}
            >
              <div style={{ display: "flex", gap: 4 }}>
                {[0, 1, 2].map((d) => (
                  <div
                    key={d}
                    className="pulse-dot"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: COLORS.beni,
                      animation: `pulse 1s ease-in-out ${d * 0.15}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {!submitted && (
          <div
            style={{
              padding: "12px 16px",
              borderTop: `1px solid ${COLORS.border}`,
              display: "flex",
              gap: 8,
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={steps[step]?.placeholder || "Type here..."}
              disabled={loading}
              style={{
                flex: 1,
                background: COLORS.darkCard,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 6,
                padding: "10px 14px",
                fontFamily: FONTS.body,
                fontSize: 13,
                color: COLORS.washi,
                outline: "none",
              }}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              style={{
                background: COLORS.beni,
                border: "none",
                borderRadius: 6,
                padding: "10px 16px",
                color: COLORS.washi,
                fontFamily: FONTS.body,
                fontSize: 13,
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading || !input.trim() ? 0.5 : 1,
              }}
            >
              →
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

// ─── CTA BAND ────────────────────────────────────────────────
function CTABand({ onCTA }) {
  return (
    <section
      style={{ padding: "80px 60px", background: COLORS.sumi, textAlign: "center" }}
    >
      <Reveal>
        <h2
          style={{
            fontFamily: FONTS.display,
            fontSize: 40,
            fontWeight: 900,
            color: COLORS.washi,
            margin: 0,
            letterSpacing: -1,
          }}
        >
          Ready to optimize<span style={{ color: COLORS.beni }}>?</span>
        </h2>
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 16,
            color: COLORS.stone,
            marginTop: 16,
            maxWidth: 500,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Take the 90-second AI assessment. We&rsquo;ll show you exactly where
          AI fits into your current operations — and what it&rsquo;ll do for
          your efficiency.
        </p>
        <div style={{ marginTop: 32 }}>
          <CTAButton onClick={onCTA}>
            Start Your Free AI Assessment →
          </CTAButton>
        </div>
      </Reveal>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────
function Footer({ onCTA }) {
  return (
    <footer
      role="contentinfo"
      style={{
        padding: "80px 60px 40px",
        background: COLORS.sumi,
        borderTop: `1px solid ${COLORS.border}`,
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <Logo size={24} />
              <p
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 13,
                  color: COLORS.subtleText,
                  marginTop: 12,
                  maxWidth: 340,
                }}
              >
                Custom AI systems mixed into your operations. Built in Salt Lake
                City. Deployed on your hardware. Optimized for how you work.
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <CTAButton onClick={onCTA}>Get Your AI Assessment →</CTAButton>
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 11,
                  color: COLORS.subtleText,
                  marginTop: 12,
                }}
              >
                hello@champloo.ai
              </div>
            </div>
          </div>
        </Reveal>
        <div
          style={{
            borderTop: `1px solid ${COLORS.border}`,
            marginTop: 48,
            paddingTop: 20,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: FONTS.body,
              fontSize: 11,
              color: COLORS.subtleText,
            }}
          >
            © 2026 champloo.ai — Salt Lake City, UT
          </span>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy", "Terms"].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 11,
                  color: COLORS.subtleText,
                  textDecoration: "none",
                }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ────────────────────────────────────────────────────
export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const openChat = () => setChatOpen(true);

  return (
    <div style={{ background: COLORS.sumi, minHeight: "100vh", color: COLORS.washi }}>
      <JsonLd />
      <GrainOverlay />
      <Nav onCTA={openChat} />

      <main role="main">
        <Hero onCTA={openChat} />
        <Philosophy />
        <Problem />
        <HowItWorks />
        <Architecture />
        <Industries />
        <Results />
        <Pricing />
        <FAQ />
        <CTABand onCTA={openChat} />
      </main>

      <Footer onCTA={openChat} />
      <AIAssessment isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
