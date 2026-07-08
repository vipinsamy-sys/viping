import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 9.11, display: '9.11', label: 'CGPA · Sem 1', decimals: 2 },
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
        <h2 className="section-heading"><span>I Am</span> Vipin G.</h2>

        <div className={styles.about__grid}>
          <div className={styles.about__bio} ref={bioRef}>
            <p>
              Second-year Mechatronics Engineering student at Kongu Engineering College.
            </p>

            <p>
              Interested in backend systems, embedded systems, robotics, and
              entrepreneurship. Also exploring freelancing, 3D printing, and improving
              through hackathons — both building and understanding how problems
              become products.
            </p>

            <p>
              Across projects and hackathons, I&apos;ve usually been the one doing the
              research, problem framing, and keeping the team pointed at the
              right thing to build.
            </p>

            <p className={styles.about__tagline}>
              I&apos;m early. But I&apos;m moving.
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
