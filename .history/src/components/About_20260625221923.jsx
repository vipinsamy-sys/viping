import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 9.11, display: '9.11', label: 'CGPA · Sem 1', decimals: 2 },
  { value: 1, display: '1×', label: 'Hackathon Win', decimals: 0 },
  { value: 2, display: '2×', label: 'Runner-Up Finishes', decimals: 0 },
];

export default function About() {
  const sectionRef = useRef(null);
  const bioRef = useRef(null);
  const statsRefs = useRef([]);

  useEffect(() => {
    // Bio reveal
    gsap.fromTo(
      bioRef.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: bioRef.current, start: 'top 88%', once: true },
      }
    );

    // Stat counters
    statsRefs.current.forEach((el, i) => {
      if (!el) return;
      const stat = STATS[i];
      const numEl = el.querySelector('[data-count]');
      const suffix = stat.display.includes('×') ? '×' : '';

      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      );

      const counter = { val: 0 };
      gsap.to(counter, {
        val: stat.value, duration: 1.2, ease: 'power2.out', delay: i * 0.1,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onUpdate: function () {
          if (numEl) {
            numEl.textContent = counter.val.toFixed(stat.decimals) + suffix;
          }
        },
      });
    });
  }, []);

  return (
    <section id="about" className={`${styles.about} section`} ref={sectionRef}>
      <div className="container">
        <p className="section-label">// about</p>
        <h2 className="section-heading">Who I <span>Am</span></h2>

        <div className={styles.about__grid}>
          <div className={styles.about__bio} ref={bioRef}>
            <p>
              I&apos;m a first-year Mechatronics Engineering student at KEC Perundurai, but the title is incidental.
              What actually drives me is building things that work — not prototypes that live in a deck,
              but systems that run in the real world. I&apos;ve already shipped software inside the college:
              an event management platform, an official association website, an e-commerce backend deployed
              on Railway and Vercel. Real infrastructure, real users, real edge cases.
            </p>
            <p>
              I work end-to-end — from the ESP32 talking to a motor driver to the FastAPI endpoint
              serving a React frontend. Backend, embedded, a bit of ML. The stack isn&apos;t the point;
              the problem is. I pick whatever closes the gap between the idea and something you can
              actually use. That habit of thinking about the whole system — not just the part assigned
              to me — is what I keep coming back to.
            </p>
            <p>
              I care a lot about what gets built and why. The best version of any project starts
              with the right question, and I&apos;d rather spend an hour framing the problem well than
              a week building the wrong thing cleanly. Still early, obviously — but I&apos;m shipping,
              learning fast, and not particularly patient about it.
            </p>
          </div>

          <div className={styles.about__stats}>
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={styles['stat-card']}
                ref={el => (statsRefs.current[i] = el)}
              >
                <div className={styles['stat-card__number']}>
                  <span data-count>{stat.decimals === 2 ? '0.00' : '0'}{stat.display.includes('×') ? '×' : ''}</span>
                </div>
                <div className={styles['stat-card__label']}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
