import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Achievements.module.css';

gsap.registerPlugin(ScrollTrigger);

const ACHIEVEMENTS = [
  {
    icon: '🥇',
    accent: 'blue',
    title: '2× Hackathon Runner-Up',
    subtitle: 'Two runner-up finishes at college-level hackathons — built and shipped under pressure, both times.',
  },
  {
    icon: '🏫',
    accent: 'purple',
    title: 'SHA System — Official Association Website',
    subtitle: 'Built the official site for KEC\'s Science and Humanities Association. Running in production at sh.kongu.edu.',
    link: 'https://sh.kongu.edu',
  },
  {
    icon: '📊',
    accent: 'blue',
    title: 'CGPA 9.11 — Semester 1, Mechatronics @ KEC',
    subtitle: 'Topped the first semester while shipping real projects on the side.',
  },
];

export default function Achievements() {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.65, ease: 'power2.out', delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      );
    });
  }, []);

  return (
    <section id="achievements" className="section">
      <div className="container">
        <p className="section-label">// wins</p>
        <h2 className="section-heading">What I&apos;ve <span>Won</span></h2>

        <div className={styles.achievements__list}>
          {ACHIEVEMENTS.map((a, i) => (
            <div
              key={a.title}
              className={`
                ${styles['achievement-card']}
                ${styles[`achievement-card--${a.accent}`]}
                ${a.link ? styles['achievement-card--link'] : ''}
              `}
              ref={el => (cardsRef.current[i] = el)}
              onClick={a.link ? () => window.open(a.link, '_blank') : undefined}
            >
              <span className={styles['achievement-card__icon']}>{a.icon}</span>
              <div className={styles['achievement-card__body']}>
                <div className={styles['achievement-card__title']}>{a.title}</div>
                <div className={styles['achievement-card__subtitle']}>{a.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
