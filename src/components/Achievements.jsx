import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Achievements.module.css';

gsap.registerPlugin(ScrollTrigger);

const ACHIEVEMENTS = [
  {
    accent: 'purple',
    title: 'Mini-Hackathon\'26 — Runner-Up',
    subtitle: 'Presented Club Event Booking System.',
  },
  {
    accent: 'blue',
    title: 'E-Horizon\'26 Webify — Runner-Up',
    subtitle: 'Built a inventory management and re-order system.',
  },
  {
    accent: 'cyan',
    title: 'Technical Quiz First prize',
    subtitle: '',
  },
  {
    accent: 'purple',
    title: 'Mathwizard Second prize',
    subtitle: '',
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
              <span className={`${styles['achievement-card__dot']} ${styles[`dot-${a.accent}`]}`} />
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
