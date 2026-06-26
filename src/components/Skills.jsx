import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Skills.module.css';

gsap.registerPlugin(ScrollTrigger);

const SKILL_CARDS = [
  {
    color: 'green',
    label: 'Backend',
    tags: ['FastAPI', 'Node.js', 'Express', 'TypeScript', 'Python', 'REST APIs', 'JWT Auth', 'PostgreSQL', 'MongoDB'],
  },
  {
    color: 'purple',
    label: 'Frontend',
    tags: ['React', 'HTML/CSS'],
  },
  {
    color: 'blue',
    label: 'Embedded · Robotics',
    tags: ['ESP32', 'Arduino', 'C/C++'],
  },
  
];

export default function Skills() {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', delay: i * 0.07,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      );
    });
  }, []);

  return (
    <section id="skills" className="section">
      <div className="container">
        <p className="section-label">// skills</p>
        <h2 className="section-heading">What I <span>Work</span> With</h2>

        <div className={styles.skills__grid}>
          {SKILL_CARDS.map((card, i) => (
            <div
              key={card.label}
              className={`${styles['skill-card']} ${styles[`skill-card--${card.color}`]}`}
              ref={el => (cardsRef.current[i] = el)}
            >
              <div className={styles['skill-card__label']}>{card.label}</div>
              <div className={styles['skill-card__tags']}>
                {card.tags.map(tag => (
                  <span key={tag} className={styles['skill-tag']}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
