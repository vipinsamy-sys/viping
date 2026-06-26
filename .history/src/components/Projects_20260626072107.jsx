import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

const GithubIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const ExternalIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const PROJECTS = [

  {
    icon: '🏫',
    accent: 'blue',
    name: 'SHA — Science & Humanities Association Website',
    desc: 'Official website for KEC\'s Science and Humanities Association. Live, serving the college community.',
    tags: ['Web', 'HTML/CSS', 'JavaScript'],
    live: 'https://sh.kongu.edu',
    isLive: true,
  },
  {
    icon: '🛍️',
    accent: 'purple',
    name: 'Suguna E-Commerce',
    desc: 'Production deployment on Vercel and Railway. FastAPI backend with MongoDB Atlas, Vite asset path resolution, and full cart/order flow.',
    tags: ['React', 'Vite', 'FastAPI', 'MongoDB', 'Railway', 'Vercel'],
    github: 'https://github.com/vipinsamy-sys',
  },
  {
    icon: '🤖',
    accent: 'cyan',
    name: 'ESP32 RC Car',
    desc: 'ESP32-CAM module with Bluetooth control and L298N motor driver integration. Real hardware build — drives, steers, and streams.',
    tags: ['ESP32', 'Arduino', 'C++', 'Bluetooth'],
    github: 'https://github.com/vipinsamy-sys',
  },
  {
    icon: '📦',
    accent: 'green',
    name: 'Inventory Intelligence System',
    desc: 'Smart inventory tracking with automated stock-level logic and reorder triggers. Keeps warehouse state consistent without manual intervention.',
    tags: ['Node.js', 'MongoDB', 'Express'],
    github: 'https://github.com/vipinsamy-sys',
  },
  {
    icon: '🧬',
    accent: 'blue',
    name: 'ML Health Tracker',
    desc: 'ML-powered health prediction with a Flask backend, trained classification model, and an OpenAI GPT-4o-mini chatbox for contextual health Q&A.',
    tags: ['Python', 'Flask', 'ML', 'OpenAI API', 'Node.js'],
    github: 'https://github.com/vipinsamy-sys',
  },
];

export default function Projects() {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', delay: (i % 2) * 0.07,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      );
    });
  }, []);

  return (
    <section id="projects" className="section">
      <div className="container">
        <p className="section-label">// work</p>
        <h2 className="section-heading">Things I&apos;ve <span>Built</span></h2>

        <div className={styles.projects__grid}>
          {PROJECTS.map((p, i) => {
            const cardProps = p.live
              ? { as: 'a', href: p.live, target: '_blank', rel: 'noopener noreferrer' }
              : {};

            return (
              <div
                key={p.name}
                className={`${styles['project-card']} ${styles[`accent-${p.accent}`]}`}
                ref={el => (cardsRef.current[i] = el)}
                onClick={p.live ? () => window.open(p.live, '_blank') : undefined}
                style={{ cursor: p.live || p.github ? 'pointer' : 'default' }}
              >
                <div className={styles['project-card__header']}>
                  <span className={styles['project-card__icon']}>{p.icon}</span>
                  {p.isLive && (
                    <span className={styles['project-card__badge']}>↗ live</span>
                  )}
                </div>

                <h3 className={styles['project-card__name']}>{p.name}</h3>
                <p className={styles['project-card__desc']}>{p.desc}</p>

                <div className={styles['project-card__footer']}>
                  <div className={styles['project-card__tags']}>
                    {p.tags.map(t => (
                      <span key={t} className={styles['project-tag']}>{t}</span>
                    ))}
                  </div>
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles['project-card__link']}
                      onClick={e => e.stopPropagation()}
                    >
                      <GithubIcon />
                      GitHub
                    </a>
                  )}
                  {p.live && !p.isLive && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles['project-card__link']}
                      onClick={e => e.stopPropagation()}
                    >
                      <ExternalIcon />
                      Visit
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
