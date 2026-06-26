import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Hero.module.css';

const PHRASES = [
  'I build systems that think.',
  'Backend, Embedded, Robotics.',
];

const BADGES = [
  'FastAPI · Node.js',
  'PostgreSQL · MongoDB · Prisma',
  'React',
  'ESP32 · Arduino · C++',
];

// Icons
const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

export default function Hero() {
  const eyebrowRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const typewriterRef = useRef(null);
  const badgesRef = useRef(null);
  const buttonsRef = useRef(null);

  const [displayed, setDisplayed] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const current = PHRASES[phraseIndex];
    let timeout;

    if (!isDeleting) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setIsDeleting(false);
        setPhraseIndex((phraseIndex + 1) % PHRASES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, phraseIndex]);

  // GSAP entrance animation
  useEffect(() => {
    const els = [eyebrowRef.current, nameRef.current, roleRef.current, typewriterRef.current, badgesRef.current, buttonsRef.current];

    // Establish starting state before timeline fires
    gsap.set(els, { y: 30, opacity: 1 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
      .to(nameRef.current,    { opacity: 1, y: 0, duration: 0.7 }, 0.38)
      .to(roleRef.current,    { opacity: 1, y: 0, duration: 0.6 }, 0.56)
      .to(typewriterRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.72)
      .to(badgesRef.current,  { opacity: 1, y: 0, duration: 0.6 }, 0.9)
      .to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.06);
  }, []);

  return (
    <section className={styles.hero} id="hero">
      <div className="container">
        <div className={styles.hero__content}>
          <p ref={eyebrowRef} className={styles.hero__eyebrow}>
            Mechatronics Engineer · Builder
          </p>

          <h1 ref={nameRef} className={styles.hero__name}>
            <span className={styles['hero__name--white']}>Vipin </span>
            <span className={styles['hero__name--blue']}>G</span>
          </h1>

          <p ref={roleRef} className={styles.hero__role}>
            Building at the intersection of software, hardware, and systems.
          </p>

          <div ref={typewriterRef} className={styles.hero__typewriter}>
            <span className={styles['hero__typewriter-prefix']}>&gt;&nbsp;</span>
            <span>{displayed}</span>
            <span className={styles.hero__cursor} />
          </div>

          <div ref={badgesRef} className={styles.hero__badges}>
            {BADGES.map(b => (
              <span key={b} className={styles.hero__badge}>{b}</span>
            ))}
          </div>

          <div ref={buttonsRef} className={styles.hero__buttons}>
            <a
              href="https://github.com/vipinsamy-sys"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles['btn--filled']}`}
            >
              <GithubIcon />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/vipin-g-965316314"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles['btn--outline']}`}
            >
              <LinkedinIcon />
              LinkedIn
            </a>
            <button
              className={`${styles.btn} ${styles['btn--outline']}`}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
